// Views for the Contact page
import './Contact.css';
import { useState } from 'react';
import { CONTACT_EMAIL, TWITTER_X_URL, FACEBOOK_URL } from '../config';

function ContactForm() {
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [comments, setComments] = useState();

  const handleSubmit = function (e) {
    e.preventDefault();
    // TODO: handler function for form submit
    const formVals = {
      email,
      firstName,
      lastName,
      comments,
    };
    console.log('=== form submitted: values:', JSON.stringify(formVals));
  };

  return (
    <div className="contact-form" id="contact-form">
      <form
        action="#"
        method="POST"
        class="mx-auto mt-16 max-w-xl sm:mt-20"
        onSubmit={handleSubmit}
      >
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Firstname */}
          <div>
            <label
              for="first-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div class="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>

          {/* Last name */}
          <div>
            <label
              for="last-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div class="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div class="sm:col-span-2">
            <label
              for="email"
              class="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div class="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Comments */}
          <div class="sm:col-span-2">
            <label
              for="comments"
              class="block text-sm font-semibold leading-6 text-gray-900"
            >
              Comments
            </label>
            <div class="mt-2.5">
              <input
                type="text"
                name="comments"
                id="comments"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={comments}
                placeholder="Leave a comment"
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div class="mt-10">
          <button
            type="submit"
            class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Leave me a message
          </button>
        </div>
      </form>
    </div>
  );
}

// Contact page with form
function Contact() {
  return (
    <div>
      <h2 className="text-2xl my-12 font-semibold">Contact</h2>

      <div>
        <p>
          Condimentum id auctor quis, ultricies in turpis. Vestibulum suscipit
          commodo ante quis tincidunt. Cras posuere fringilla lectus, ac posuere
          ligula auctor non. Mauris metus nulla, aliquet non aliquam a, lacinia
          sed nulla. Sed quis consequat massa. In hac habitasse plate.
        </p>
      </div>
      <div className="mt-20">
        <h3 className="text-xl my-12 font-semibold">Get in touch</h3>
        <p>If you'd like to get in touch, I'd love to hear from you.</p>

        {/* Contact form */}
        <ContactForm />

        {/* Social media */}
        <div className="contact-methods mt-20">
          <h2 className="text-2xl my-12 font-semibold">Social media</h2>
          <p>
            <span className="contact-method-item">
              <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
            </span>
          </p>
          <p>
            <span className="contact-method-item">
              <a href={FACEBOOK_URL}>Facebook</a>
            </span>
          </p>
          <p>
            <span className="contact-method-item">
              <a href={TWITTER_X_URL}>Twitter / X</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
