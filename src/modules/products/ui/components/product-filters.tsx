"use client";

import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { useProductFilters } from "~/modules/products/hooks/use-product-filters";
import { PriceFilter } from "~/modules/products/ui/components/price-filter";
import { TagsFilter } from "~/modules/products/ui/components/tags-filter";

interface ProductFilterProps {
	title: string;
	className?: string;
	children: React.ReactNode;
}

const ProductFilter = ({ title, className, children }: ProductFilterProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

	return (
		<div className={cn("p-4 border-b flex flex-col gap-2", className)}>
			<button
				onClick={() => setIsOpen((current) => !current)}
				className="flex items-center justify-between cursor-pointer"
				type="button"
			>
				<p className="font-medium">{title}</p>
				<Icon className="size-5" />
			</button>

			{isOpen && children}
		</div>
	);
};

export const ProductFilters = () => {
	const { filters, setFilters, clear } = useProductFilters();

	const hasAnyFilter = Object.entries(filters).some(([key, value]) => {
		if (key === "sort") return false;

		if (typeof value === "string") {
			return value !== "";
		}

		if (Array.isArray(value)) {
			return value.length > 0;
		}

		return value !== null && value !== undefined;
	});

	const onChange = (key: keyof typeof filters, value: unknown) => {
		setFilters((current) => ({
			...current,
			[key]: value,
		}));
	};

	return (
		<div className="border rounded-md bg-white">
			<div className="p-4 border-b flex items-center justify-between">
				<p className="font-medium">Filters</p>
				{hasAnyFilter && (
					<button
						className="underline cursor-pointer"
						type="button"
						onClick={clear}
					>
						Clear
					</button>
				)}
			</div>
			<ProductFilter title="Price">
				<PriceFilter
					minPrice={filters.minPrice}
					maxPrice={filters.maxPrice}
					onMinPriceChange={(value) => onChange("minPrice", value)}
					onMaxPriceChange={(value) => onChange("maxPrice", value)}
				/>
			</ProductFilter>
			<ProductFilter title="Tags" className="border-b-0">
				<TagsFilter
					value={filters.tags}
					onChange={(value) => onChange("tags", value)}
				/>
			</ProductFilter>
		</div>
	);
};
