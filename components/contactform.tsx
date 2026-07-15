"use client";
import clsx from "clsx";
import { useActionState } from "react";
import { ContactMessage } from "@/lib/action";

const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(ContactMessage, null);

  const error = state?.error;
  const fieldErrors = error && typeof error === "object" ? error : undefined;

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-l bg-green-50"
          role="alert"
        >
          <div className="font-medium ">{state.message}</div>
        </div>
      ) : null}
      <form action={formAction}>
        <div className="grid md:grid-cols-2 gap-7 mt-6">
          <div>
            <input
              type="text"
              name="name"
              className="bg-gray-50 p-3 border border-gray-300 roundes-sm w-full font-light"
              placeholder="Name"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {fieldErrors?.name?.[0]}
              </p>
            </div>
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="bg-gray-50 p-3 border border-gray-300 roundes-sm w-full font-light"
              placeholder="hamba allah"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {" "}
                {fieldErrors?.email?.[0]}
              </p>
            </div>
          </div>
          <div className="md:col-span-2">
            <input
              type="text"
              name="subject"
              className="bg-gray-50 p-3 border border-gray-300 roundes-sm w-full font-light"
              placeholder="Subject"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {" "}
                {fieldErrors?.subject?.[0]}
              </p>
            </div>
          </div>
          <div className="md:col-span-2">
            <textarea
              name="message"
              rows={5}
              className="bg-gray-50 p-3 border border-gray-300 roundes-sm w-full font-light"
              placeholder="youre message"
            ></textarea>

            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {" "}
                {fieldErrors?.message?.[0]}
              </p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={clsx(
            "px-10 py-4 text-center font-semibold text-white w-full bg-orange-400 rounded-sm hover:bg-orange-500 cursor-pointer",
            { "opacity-50 cursor-progres animate-pulse": isPending },
          )}
          disabled={isPending}
        >
          {isPending ? "loading..." : "send message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
