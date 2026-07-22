import Image from "next/image";
import { aboutDirectors } from "@/data/aboutDirectors";

export default function DirectorSection() {
  return (
    <section className="sd-about-directors">
      <div className="container">
        <div className="sd-about-section-head sd-about-directors__head">
          <p className="sd-about-eyebrow">Our Directors</p>
          <h2>Leadership behind Skydecor Dubai</h2>
        </div>

        <div className="sd-about-directors__list">
          {aboutDirectors.map((director) => (
            <article className="sd-about-director" key={director.name}>
              <div className="sd-about-director__image">
                <Image
                  src={director.image}
                  alt={director.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 42vw"
                />
              </div>

              <div className="sd-about-director__content">
                <h3>{director.name}</h3>
                <p className="sd-about-director__role">{director.role}</p>
                {director.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
