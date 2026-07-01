const LOVABLE_ASSET_ORIGIN = "https://project--1d769e85-cb44-4a7c-82cc-dc04d76222ca.lovable.app";

export function stableAssetUrl(url: string) {
  if (url.startsWith("/__l5e/")) return `${LOVABLE_ASSET_ORIGIN}${url}`;
  return url;
}