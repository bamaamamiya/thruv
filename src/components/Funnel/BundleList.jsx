import BundleOption from "./BundleOption";

const BundleList = ({ bundles, selectedBundle, onSelectBundle }) => (
  <div className="space-y-2">
    {bundles.map((bundleOption) => (
      <BundleOption
        key={bundleOption.title}
        title={bundleOption.title}
        description={bundleOption.description}
        isRecommended={bundleOption.isRecommended}
        isActive={selectedBundle === bundleOption.title}
        price={bundleOption.price}
        isPrice={bundleOption.isPrice}
        onClick={() => onSelectBundle(bundleOption)}
      />
    ))}
  </div>
);

export default BundleList;
