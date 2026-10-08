"use client";

import { useActionState } from "react";
import { subscribeToNewsletter, type NewsletterState } from "@/app/actions";

const initialState: NewsletterState = { status: "idle" };

// Posts to a server action so the address travels in the request body, even
// when the form is submitted before hydration or without JavaScript.
export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    initialState,
  );

  if (state.status === "subscribed") {
    return (
      <p className="text-body" role="status">
        Thank you. You&rsquo;ll hear from us soon.
      </p>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form action={formAction} className="flex items-end gap-3">
        <label className="flex-1">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Email address"
            className="w-full border-b border-foreground bg-transparent py-3 text-body outline-none placeholder:text-muted focus-visible:border-b-2"
          />
        </label>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          Subscribe
        </button>
      </form>
      {state.status === "invalid" && (
        <p className="caption mt-3" role="alert">
          Enter a valid email address.
        </p>
      )}
    </div>
  );
}
