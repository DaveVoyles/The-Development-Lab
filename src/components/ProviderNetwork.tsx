import { useMemo, useState } from "react";
import { categoryLabels, providers, type ProviderCategory } from "../data/providers";

export function ProviderNetwork() {
  const [category, setCategory] = useState<ProviderCategory | "all">("all");
  const filteredProviders = useMemo(
    () => providers.filter((provider) => category === "all" || provider.category === category),
    [category]
  );

  return (
    <section className="section-shell" id="providers">
      <div className="section-heading">
        <p className="eyebrow">Provider network</p>
        <h2>A pilot network built to help specialists reach the right families.</h2>
        <p>
          These sample profiles use proposal categories to demonstrate the marketplace direction. Public provider
          listings can be anonymized or confirmed before launch.
        </p>
      </div>
      <div className="filter-row">
        <button className={category === "all" ? "active" : ""} onClick={() => setCategory("all")} type="button">
          All
        </button>
        {Object.entries(categoryLabels).map(([value, label]) => (
          <button
            className={category === value ? "active" : ""}
            data-cat={value}
            key={value}
            onClick={() => setCategory(value as ProviderCategory)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="provider-grid">
        {filteredProviders.map((provider) => (
          <article className="provider-card" data-cat={provider.category} key={provider.id}>
            <span className={`cat-${provider.category}`}>{categoryLabels[provider.category]}</span>
            <h3>{provider.name}</h3>
            <p>{provider.location}</p>
            <div className="tag-row">
              {provider.tags.slice(0, 3).map((tag) => (
                <small key={tag}>{tag}</small>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

