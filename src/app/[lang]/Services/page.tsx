"use client";

import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";
import Head from "next/head";
import React from "react";
import {
  FaChartLine,
  FaCode,
  FaFileContract,
  FaGlobe,
  FaStamp,
  FaStore,
} from "react-icons/fa";

const ServicesPage: React.FC = () => {
  const { language: lang } = useLanguage();
  const t = translations[lang];

  return (
    <>
      <Head>
        <title>{t.seo.services.title}</title>
        <meta name="description" content={t.seo.services.description} />
      </Head>

      <div className="max-w-[1200px] mx-auto p-8 w-full">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 mb-12 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.services.title}
          </h1>
          <p className="text-xl mb-6">{t.features.section1.title}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Mapeando os serviços do arquivo de traduções */}
          {t.services.items.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                {/* Ícones baseados no ID do serviço */}
                {service.id === "website-creation" && (
                  <FaCode className="text-blue-600 text-3xl mr-4" />
                )}
                {service.id === "ecommerce" && (
                  <FaStore className="text-blue-600 text-3xl mr-4" />
                )}
                {service.id === "consulting" && (
                  <FaChartLine className="text-blue-600 text-3xl mr-4" />
                )}
                {service.id === "business-formation" && (
                  <FaFileContract className="text-blue-600 text-3xl mr-4" />
                )}
                {service.id === "sworn-translation" && (
                  <FaGlobe className="text-blue-600 text-3xl mr-4" />
                )}
                {service.id === "legalization" && (
                  <FaStamp className="text-blue-600 text-3xl mr-4" />
                )}
                <h2 className="text-2xl font-bold text-gray-800">
                  {service.title}
                </h2>
              </div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t.services.title}
          </h2>
          <p className="text-xl text-gray-600 mb-6">{t.quoteForm.submitText}</p>
          <div className="space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105">
              {t.button.learnMore}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
