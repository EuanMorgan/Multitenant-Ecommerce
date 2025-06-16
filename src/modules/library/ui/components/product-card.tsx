import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
	id: string;
	name: string;
	imageUrl?: string | null;
	tenantSlug: string;
	tenantImageUrl?: string | null;
	reviewRating: number;
	reviewCount: number;
}

export const ProductCard = ({
	id,
	name,
	imageUrl,
	tenantSlug,
	tenantImageUrl,
	reviewRating,
	reviewCount,
}: ProductCardProps) => {
	return (
		<Link prefetch href={`/library/${id}`}>
			<div className="hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col">
				<div className="relative aspect-square">
					<Image
						alt={name}
						fill
						className="object-cover"
						src={imageUrl || "/placeholder.png"}
					/>
				</div>
				<div className="p-4 border-y flex flex-col gap-3 flex-1">
					<h2 className="text-lg font-medium line-clamp-4">{name}</h2>

					<div className="flex items-center gap-2 cursor-pointer hover:opacity-50">
						{tenantImageUrl && (
							<Image
								alt={tenantSlug}
								src={tenantImageUrl}
								width={16}
								height={16}
								className="rounded-full border size-[16px] shrink-0"
							/>
						)}

						<p className="text-sm underline font-medium">{tenantSlug}</p>
					</div>
					{reviewCount > 0 && (
						<div className="flex items-center gap-1">
							<StarIcon className="size-3.5 fill-black" />
							<p className="text-sm font-medium">
								{reviewRating} ({reviewCount}{" "}
								{reviewCount === 1 ? "review" : "reviews"})
							</p>
						</div>
					)}
				</div>
			</div>
		</Link>
	);
};

export const ProductCardSkeleton = () => {
	return (
		<div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse" />
	);
};
