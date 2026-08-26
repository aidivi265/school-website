import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { PageHero, SectionHeader } from '../components/ui';
import { facilities } from '../data/facilities';
import { schoolConfig } from '../config/schoolConfig';

const { name } = schoolConfig;

export default function FacilitiesPage() {
  return (
    <div>
      <PageHero
        title="Our Facilities"
        subtitle="World-class infrastructure designed to support every dimension of learning and growth"
        breadcrumb="Facilities"
        bgImage="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1600&q=85"
      />

      {/* Intro */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Infrastructure"
            title="Built for Excellence"
            subtitle={`Every facility at ${name} is designed with one goal — to provide the best possible environment for learning, exploration, and growth.`}
          />
        </div>
      </section>

      {/* Individual Facility Cards */}
      <div className="bg-white">
        {facilities.map((facility, index) => (
          <section
            key={facility.id}
            className={`py-16 px-4 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fc]'}`}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className={`${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
                <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">
                  Facility {String(facility.id).padStart(2, '0')}
                </p>
                <h2 className="font-serif text-3xl font-bold text-navy-900 mb-3">{facility.title}</h2>
                <div className="w-14 h-1 bg-amber-600 rounded-full mb-5" />
                <p className="text-slate-600 leading-relaxed mb-6">{facility.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {facility.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="py-14 px-4 bg-navy-800">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-serif text-3xl font-bold mb-3">Visit Our Campus</h2>
          <p className="text-navy-200 mb-6">Schedule a campus tour and see our facilities first-hand.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-navy-800 font-bold px-7 py-3.5 rounded-xl hover:bg-amber-50 transition-colors shadow-md">
            Schedule a Visit <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
