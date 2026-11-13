'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  MapPin,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Info,
  Tag,
  CheckCircle,
  SlidersHorizontal,
  Heart,
} from 'lucide-react';
import { CATEGORIES, MOCK_MARKETPLACE_PRODUCTS } from '@/lib/constants';
import { MockProductListing } from '@/lib/types';
import { SubmitListingModal } from '@/components/SubmitListingModal';

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>('all');

  // Modal inspection request
  const [selectedProduct, setSelectedProduct] = useState<MockProductListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    return MOCK_MARKETPLACE_PRODUCTS.filter((item) => {
      // Search
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      // Marketplace
      const matchesMarketplace =
        selectedMarketplace === 'all' || item.marketplace === selectedMarketplace;

      // Price
      let matchesPrice = true;
      if (priceRange === 'under-30k') matchesPrice = item.price < 30000;
      else if (priceRange === '30k-60k') matchesPrice = item.price >= 30000 && item.price <= 60000;
      else if (priceRange === '60k-150k') matchesPrice = item.price > 60000 && item.price <= 150000;
      else if (priceRange === 'above-150k') matchesPrice = item.price > 150000;

      return matchesSearch && matchesCategory && matchesMarketplace && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange, selectedMarketplace]);

  const handleRequestInspection = (product: MockProductListing) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0A09] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header & Disclaimer Banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181613] border border-[#F5C45E]/30 text-[#F5C45E] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C45E]" />
            External Marketplace Listings
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Marketplace Discovery & Verification
          </h1>
          <p className="text-sm sm:text-base text-[#9E9B95] max-w-3xl leading-relaxed">
            Browse simulated listings found on external classifieds. Click "Request Inspection" to have a verified specialist physically inspect any item before you commit.
          </p>

          {/* Luxury Demo Notice */}
          <div className="mt-4 p-4 rounded-2xl bg-[#141311] border border-[#F5C45E]/20 text-xs text-[#9E9B95] flex items-start gap-3 shadow-sm">
            <Info className="w-4 h-4 text-[#F5C45E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Sample Data Notice:</strong> All products below represent realistic mock listings across Indian cities for demonstration purposes. Ezer is an independent third-party verification platform.
            </div>
          </div>
        </div>

        {/* Luxury Filter & Search Bar */}
        <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-5 sm:p-6 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8E8B85] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search phone model, bike, brand or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 focus:shadow-[0_0_15px_rgba(245,196,94,0.15)] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-[#75726B] outline-none transition-all"
              />
            </div>

            {/* Price Filter */}
            <div className="w-full md:w-52">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 rounded-2xl px-4 py-3 text-sm text-white outline-none"
              >
                <option value="all" className="bg-[#141311]">All Price Ranges</option>
                <option value="under-30k" className="bg-[#141311]">Under ₹30,000</option>
                <option value="30k-60k" className="bg-[#141311]">₹30,000 - ₹60,000</option>
                <option value="60k-150k" className="bg-[#141311]">₹60,000 - ₹1,50,000</option>
                <option value="above-150k" className="bg-[#141311]">Above ₹1,50,000</option>
              </select>
            </div>

            {/* Marketplace Filter */}
            <div className="w-full md:w-52">
              <select
                value={selectedMarketplace}
                onChange={(e) => setSelectedMarketplace(e.target.value)}
                className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 rounded-2xl px-4 py-3 text-sm text-white outline-none"
              >
                <option value="all" className="bg-[#141311]">All Marketplaces</option>
                <option value="OLX" className="bg-[#141311]">OLX</option>
                <option value="Facebook Marketplace" className="bg-[#141311]">Facebook Marketplace</option>
                <option value="Quikr" className="bg-[#141311]">Quikr</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === 'All'
                  ? 'bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#0B0A09] font-bold shadow-[0_0_15px_rgba(245,196,94,0.3)]'
                  : 'bg-[#1C1A17] border border-[#26241F] text-[#9E9B95] hover:text-white hover:border-[#F5C45E]/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2.5 ${
                  selectedCategory === cat.name
                    ? 'bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#0B0A09] font-bold shadow-[0_0_15px_rgba(245,196,94,0.3)]'
                    : 'bg-[#1C1A17] border border-[#26241F] text-[#9E9B95] hover:text-white hover:border-[#F5C45E]/30'
                }`}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden bg-black/40 shrink-0 border border-white/10">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Success Toast */}
        {successToast && (
          <div className="p-4 rounded-2xl bg-[#35A66A]/20 border border-[#35A66A]/40 text-[#4ADE80] text-xs font-semibold flex items-center justify-between animate-fadeIn shadow-md">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#35A66A]" />
              Inspection request created! Available to local expert partners in that district.
            </span>
            <button onClick={() => setSuccessToast(false)} className="text-white text-xs underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#141311] rounded-3xl border border-[#26241F] p-8 space-y-3">
            <Search className="w-12 h-12 text-[#8E8B85] mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No listings match your search</h3>
            <p className="text-xs text-[#8E8B85]">Try resetting the filters or keywords.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceRange('all');
                setSelectedMarketplace('all');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#1C1A17] text-xs font-semibold text-[#F5C45E] border border-[#353127]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 sm:overflow-visible sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="shrink-0 w-[285px] sm:w-auto snap-center bg-[#141311] border border-[#26241F] hover:border-[#F5C45E]/40 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_45px_rgba(245,196,94,0.15)]"
              >
                <Link href={`/product/${product.id}`} className="block">
                  {/* Image container */}
                  <div className="relative h-52 w-full bg-[#100F0D] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Demo badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-900/90 text-neutral-300 border border-neutral-700">
                        Demo
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#8E8B85]">
                      <span className="flex items-center gap-1.5 truncate max-w-[180px]">
                        <MapPin className="w-3.5 h-3.5 text-[#F5C45E] shrink-0" />
                        {product.location}
                      </span>
                      <span>{product.posted_time}</span>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-white line-clamp-2 leading-snug group-hover:text-[#F5C45E] transition-colors">
                      {product.title}
                    </h3>

                    {/* Price and discount */}
                    <div className="flex items-baseline justify-between pt-1">
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-xl font-extrabold text-[#F5C45E]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#8E8B85] line-through">
                          ₹{product.original_price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-xs text-[#35A66A] font-bold px-2 py-0.5 rounded-full bg-[#35A66A]/10 border border-[#35A66A]/30">
                        {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                      </span>
                    </div>

                    <div className="text-xs text-[#8E8B85] pt-2 border-t border-[#201E1A] flex items-center justify-between">
                      <span>Seller: {product.seller_name}</span>
                      <span className="text-[#F5C45E] font-medium">Standard Check: ₹499</span>
                    </div>
                  </div>
                </Link>

                {/* Bottom CTA */}
                <div className="p-5 pt-0">
                  <Link
                    href={`/product/${product.id}`}
                    className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F5C45E] via-[#E8B44A] to-[#D99C32] text-[#0B0A09] shadow-[0_0_15px_rgba(245,196,94,0.25)] hover:shadow-[0_0_25px_rgba(245,196,94,0.45)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>View Details & Inspect</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inspection Modal */}
      {selectedProduct && (
        <SubmitListingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialMode="url"
          initialData={{
            title: selectedProduct.title,
            category: selectedProduct.category,
            url: selectedProduct.url,
            price: selectedProduct.price,
            location: selectedProduct.location,
            district: selectedProduct.district,
          }}
          onSuccess={() => {
            setSuccessToast(true);
          }}
        />
      )}
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0A09] flex items-center justify-center text-[#F5C45E]">
          <div className="w-8 h-8 border-2 border-[#F5C45E] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <MarketplaceContent />
    </Suspense>
  );
}
