"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const REQUIRED = ["fname", "lname", "email", "interest", "message", "consent"];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Validate
    const bad: Record<string, boolean> = {};
    for (const name of REQUIRED) {
      const value = data.get(name);
      if (name === "consent") {
        if (!value) bad[name] = true;
      } else if (name === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? "").trim())) bad[name] = true;
      } else if (!String(value ?? "").trim()) {
        bad[name] = true;
      }
    }
    setInvalid(bad);
    if (Object.keys(bad).length) {
      const first = form.querySelector<HTMLElement>(".field.invalid input, .field.invalid select, .field.invalid textarea");
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      // Netlify Forms: post the encoded form body back to the page.
      const res = await fetch("/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const cls = (name: string) => `field${invalid[name] ? " invalid" : ""}`;

  if (status === "sent") {
    return (
      <div className="form-alert form-alert--success" role="status" style={{ display: "block" }}>
        <strong>Thank you, your message has been sent.</strong>
        <br />
        A member of our team will be in touch within one business day.
      </div>
    );
  }

  return (
    <>
      {status === "error" && (
        <div className="form-alert form-alert--error" role="alert" style={{ display: "block" }}>
          <strong>Sorry, something went wrong sending your message.</strong>
          <br />
          Please check your connection and try again in a moment.
        </div>
      )}

      <form
        id="contact-form"
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        noValidate
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden" aria-hidden="true">
          <label>
            Leave this field empty: <input name="bot-field" />
          </label>
        </p>

        <div className="form-row">
          <div className={cls("fname")}>
            <label htmlFor="fname">First name <span className="req">*</span></label>
            <input type="text" id="fname" name="fname" autoComplete="given-name" />
            <div className="error-msg">Please enter your first name.</div>
          </div>
          <div className={cls("lname")}>
            <label htmlFor="lname">Last name <span className="req">*</span></label>
            <input type="text" id="lname" name="lname" autoComplete="family-name" />
            <div className="error-msg">Please enter your last name.</div>
          </div>
        </div>

        <div className="form-row">
          <div className={cls("email")}>
            <label htmlFor="email">Email address <span className="req">*</span></label>
            <input type="email" id="email" name="email" autoComplete="email" />
            <div className="error-msg">Please enter a valid email address.</div>
          </div>
          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input type="tel" id="phone" name="phone" autoComplete="tel" placeholder="+27 …" />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="company">Company / organisation</label>
            <input type="text" id="company" name="company" autoComplete="organization" />
          </div>
          <div className={cls("interest")}>
            <label htmlFor="interest">I&apos;m interested in <span className="req">*</span></label>
            <select id="interest" name="interest" defaultValue="">
              <option value="">Please select…</option>
              <option>Free POPIA gap consultation</option>
              <option>POPIA gap assessment</option>
              <option>Privacy operating model design</option>
              <option>Information Officer support</option>
              <option>Policies, notices &amp; PAIA manual</option>
              <option>Staff awareness training</option>
              <option>Breach / incident response</option>
              <option>Ongoing compliance support</option>
              <option>General question</option>
            </select>
            <div className="error-msg">Please choose an option.</div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="company-size">Business size</label>
          <select id="company-size" name="company-size" defaultValue="">
            <option value="">Prefer not to say</option>
            <option>Sole proprietor / freelancer</option>
            <option>1-10 employees</option>
            <option>11-50 employees</option>
            <option>51-200 employees</option>
            <option>200+ employees</option>
          </select>
        </div>

        <div className={cls("message")}>
          <label htmlFor="message">How can we help? <span className="req">*</span></label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us a little about your business and what you'd like help with…"
          />
          <div className="error-msg">Please enter a short message.</div>
        </div>

        <div className={`checkbox-field${invalid.consent ? " invalid" : ""}`}>
          <input type="checkbox" id="consent" name="consent" />
          <label htmlFor="consent">
            I consent to Sentinel Privacy processing the personal information
            I&apos;ve provided in order to respond to my enquiry, in line with
            POPIA. <span className="req">*</span>
          </label>
        </div>
        {invalid.consent && (
          <div className="field invalid" style={{ marginTop: -10 }}>
            <div className="error-msg">Please tick the consent box so we may reply.</div>
          </div>
        )}

        <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-muted" style={{ marginTop: 14, fontSize: ".82rem", textAlign: "center" }}>
          We&apos;ll only use your details to respond to your enquiry. See how in
          our commitment to privacy below.
        </p>
      </form>
    </>
  );
}
