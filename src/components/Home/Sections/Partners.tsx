import React from 'react';

const partners = [
  { name: "Spotify", logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80" },
  { name: "Microsoft", logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80" },
  { name: "Google", logo: "https://images.unsplash.com/photo-1614680376408-12c8c384c640?auto=format&fit=crop&q=80" },
  { name: "Amazon", logo: "https://images.unsplash.com/photo-1614680376739-8568f7b2ab2b?auto=format&fit=crop&q=80" }
];

const Partners: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Trusted Partners</h2>
          <p className="text-gray-300 text-lg">
            Working with leading brands to deliver exceptional experiences
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Partners;