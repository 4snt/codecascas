"use client";

import { translations, type LanguageKeys } from "@/lib/translations";
import React, { useMemo, useState } from "react";
import Modal from "react-modal";
import { sendMail } from "./sendemail";

type ContactType = "email" | "cellphone";
type ServiceItem = { id: string; title: string };

export function QuoteForm({
  lang,
  className = "",
}: {
  lang: LanguageKeys;
  className?: string;
}) {
  const tAll = translations[lang] ?? translations.en;
  const t = tAll.quoteForm;

  const services = useMemo<ReadonlyArray<ServiceItem>>(
    () => tAll.services?.items ?? [],
    [tAll]
  );

  const SUBMITTING_TEXT = "Sending...";
  const CANCEL_TEXT = "Cancel";
  const AGREE_TEXT = "Agree & Submit";

  const [contactType, setContactType] = useState<ContactType>("email");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "",
  });
  const [showGDPR, setShowGDPR] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setShowGDPR(true);
  };

  const confirmGDPR = async () => {
    setShowGDPR(false);

    if (!formData.name || !formData.contact) {
      alert(t.errorMessage || "Por favor, preencha todos os campos");
      return;
    }
    if (!formData.service) {
      alert(t.serviceError || "Por favor, selecione um serviço");
      return;
    }

    try {
      setLoading(true);
      const resp = await sendMail(
        formData.name,
        `${contactType}: ${formData.contact}`,
        formData.service || "Serviço não especificado"
      );
      if (!resp?.success) throw new Error(resp?.message || "Falha no envio");

      setFormData({ name: "", contact: "", service: "" });
      alert(t.successMessage || "Formulário enviado com sucesso!");
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      alert(
        `${t.errorMessage || "Erro ao enviar formulário"}\nDetalhes: ${msg}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Card fluido, sempre empilhado */}
      <form
        onSubmit={onSubmit}
        className={`
          w-full
          rounded-2xl
          bg-[color:var(--glass-bg,rgba(15,18,28,0.55))]
          backdrop-blur-xl ring-1 ring-white/10
          shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          p-3 sm:p-4
          text-[var(--brand-white)]
          text-[clamp(13px,1vw,15px)]
          ${className}
        `}
      >
        {/* Nome */}
        <label className="sr-only" htmlFor="qf-name">
          {t.namePlaceholder}
        </label>
        <input
          id="qf-name"
          type="text"
          autoComplete="name"
          required
          placeholder={t.namePlaceholder}
          value={formData.name}
          onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
          className="
            w-full mb-2.5
            rounded-lg px-3 py-2.5
            bg-white/95 text-[var(--color-dark)]
            placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/60
            min-w-0
          "
        />

        {/* Contato */}
        <label className="sr-only" htmlFor="qf-contact">
          {contactType === "email" ? t.emailPlaceholder : t.phonePlaceholder}
        </label>
        <input
          id="qf-contact"
          required
          type={contactType === "email" ? "email" : "tel"}
          autoComplete={contactType === "email" ? "email" : "tel"}
          inputMode={contactType === "email" ? "email" : "tel"}
          placeholder={
            contactType === "email" ? t.emailPlaceholder : t.phonePlaceholder
          }
          value={formData.contact}
          onChange={(e) =>
            setFormData((s) => ({ ...s, contact: e.target.value }))
          }
          className="
            w-full rounded-lg px-3 py-3
            bg-white/95 text-[var(--color-dark)]
            placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/60
            min-w-0
          "
        />

        {/* Toggle email/phone */}
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setContactType("email")}
            className={`
              rounded-lg px-3 py-2.5 font-semibold transition border
              ${
                contactType === "email"
                  ? "bg-[var(--color-secondary)] text-[var(--color-dark)] border-[var(--color-secondary)]"
                  : "bg-[rgba(72,198,224,0.10)] text-white border-[rgba(72,198,224,0.5)] hover:bg-[rgba(72,198,224,0.18)]"
              }
            `}
          >
            {t.emailPlaceholder}
          </button>
          <button
            type="button"
            onClick={() => setContactType("cellphone")}
            className={`
              rounded-lg px-3 py-2.5 font-semibold transition border
              ${
                contactType === "cellphone"
                  ? "bg-[var(--color-secondary)] text-[var(--color-dark)] border-[var(--color-secondary)]"
                  : "bg-[rgba(72,198,224,0.10)] text-white border-[rgba(72,198,224,0.5)] hover:bg-[rgba(72,198,224,0.18)]"
              }
            `}
          >
            {t.phonePlaceholder}
          </button>
        </div>

        {/* Serviço */}
        <label className="sr-only" htmlFor="qf-service">
          {t.servicePlaceholder}
        </label>
        <select
          id="qf-service"
          required
          value={formData.service}
          onChange={(e) =>
            setFormData((s) => ({ ...s, service: e.target.value }))
          }
          className="
            mt-3 w-full rounded-lg px-3 py-3
            bg-white/95 text-[var(--color-dark)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/60
            min-w-0
          "
        >
          <option value="">{t.servicePlaceholder}</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>

        {/* CTA */}
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="
            mt-3
            w-full rounded-xl px-4 py-2.5
            bg-[var(--color-secondary)]/95 text-[var(--color-dark)]
            hover:bg-[var(--color-secondary)] transition-colors
            shadow-[0_6px_20px_rgba(72,198,224,0.28)]
            ring-1 ring-[var(--color-secondary)]/40
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? SUBMITTING_TEXT : t.submitText}
        </button>
      </form>

      {/* GDPR Modal */}
      <Modal
        isOpen={showGDPR}
        onRequestClose={() => setShowGDPR(false)}
        ariaHideApp={false}
        contentLabel="GDPR Modal"
        className="
          outline-none
          w-[92vw] max-w-[560px]
          bg-[rgba(15,18,28,0.95)] text-white
          rounded-2xl p-5 sm:p-6
          ring-1 ring-white/10
          shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          mx-auto
        "
        overlayClassName="
          fixed inset-0 z-[2000]
          bg-black/50 backdrop-blur-[2px]
          grid place-items-center px-4
        "
      >
        <h3 className="m-0 text-xl font-bold text-[var(--color-secondary)]">
          {t.gdprTitle || "GDPR Agreement"}
        </h3>
        <p className="mt-3 leading-relaxed text-sm sm:text-[15px] text-white/90">
          {t.gdprText ||
            `I consent to having this website store my submitted information and contact me via email, text or phone.
             Messages will come from Achei Solutions INC. Standard Text message fees apply.
             You can opt out anytime by responding "STOP" or "UNSUBSCRIBE". Terms and Privacy policy can be found at achei.us/privacy`}
        </p>

        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowGDPR(false)}
            className="rounded-lg px-4 py-2 bg-white/10 hover:bg-white/15 transition"
          >
            {CANCEL_TEXT}
          </button>
          <button
            type="button"
            onClick={confirmGDPR}
            className="
              rounded-lg px-4 py-2 font-semibold
              bg-[var(--color-secondary)]/95 text-[var(--color-dark)]
              hover:bg-[var(--color-secondary)] transition-colors
              ring-1 ring-[var(--color-secondary)]/40
            "
          >
            {AGREE_TEXT}
          </button>
        </div>
      </Modal>
    </>
  );
}
