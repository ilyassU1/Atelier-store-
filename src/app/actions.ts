"use server";

export type NewsletterState = { status: "idle" | "subscribed" | "invalid" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Not wired to a mailing-list provider yet: the address is checked and dropped.
// It arrives in the POST body only, so keep it out of logs, thrown errors,
// redirects and the returned state. Read it from FormData rather than taking
// it as a string argument: Next's dev log prints action arguments, and FormData
// shows up there as {}.
export async function subscribeToNewsletter(
  _previous: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = formData.get("email");
  if (
    typeof email !== "string" ||
    email.length > 254 ||
    !EMAIL.test(email.trim())
  ) {
    return { status: "invalid" };
  }
  return { status: "subscribed" };
}
