import { CONTACT_BIO, CONTACT_NAME } from '../config';

function About() {
  return (
    <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
      <div className="mt-32">
        <h1 className="text-4xl text-center">Hi, I'm {CONTACT_NAME}</h1>
      </div>
      <div className="my-12">
        <h2 className="text-xl my-4">About myself</h2>
        <p>{CONTACT_BIO}</p>
      </div>
      <div className="my-12">
        <h2 className="text-xl my-4">About this site</h2>
        <p>
          Praesent purus eros, fringilla a posuere vitae, imperdiet quis dui.
          Sed quis consequat massa. Etiam nisi ligula, ultricies sed molestie
          id, scelerisque quis eros. Donec laoreet, dolor sed euismod porttitor,
          neque neque pharetra erat, id ultricies massa nisl ac lacus.
          Pellentesque ut felis lectus, non sodales nibh. Cras eget lectus
          ipsum. Donec urna dolor, elementum i.
        </p>
        <p>
          Egestas eleifend, dapibus ac justo. Donec urna dolor, elementum in
          egestas eleifend, dapibus ac justo. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vestibulum dignissim fermentum diam, quis
          imperdiet magna ultricies faucibus. In sagittis, nunc sit amet feugiat
          auctor, tortor orci fermentum nibh.
        </p>
        <p>
          In placerat urna mauris eget tortor. Aenean ac dolor velit. Aenean
          velit nibh, condimentum id auctor quis, ultricies in turpis. Nunc
          euismod ultrices viverra. Pellentesque ut felis lectus, non sodales
          nibh. Quisque at augue quis tortor euismo.
        </p>
      </div>
    </div>
  );
}

export default About;
