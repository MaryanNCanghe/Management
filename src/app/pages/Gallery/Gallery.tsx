"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import classes from "./index.module.scss";
import { projects, categories } from "../../constants";

/** Project type (now with livePath + embed) */
interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string | StaticImageData; // supports public/ and imported images
  description: string;
  videoUrl?: string;
  audioUrl?: string;

  /** Optional: route to open live page (e.g., "/Projects/sales-dashboards" or "/sales-dashboards") */
  livePath?: string;

  /** Optional: if true and livePath exists, embed the page inside the Modal via <iframe> */
  embed?: boolean;
}

/** Props for the Modal component */
interface ModalProps {
  project: Project;
  onClose: () => void;
}

/** Modal - Displays Image/Video/Audio and a "Open Live Dashboard" button (if livePath is provided).
 *  If `embed` is true, it embeds the live page with an <iframe> instead of the image/video.
 */
const Modal: React.FC<ModalProps> = ({ project, onClose }) => {
  const shouldEmbed = Boolean(project.embed && project.livePath);

  return (
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={classes.closeButton} onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className={classes.modalMedia}>
          {shouldEmbed ? (
            <iframe
              src={project.livePath}
              className={classes.fullMedia}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              title={project.title}
            />
          ) : (
            <>
              {/* Image */}
              {typeof project.imageUrl === "string" ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className={classes.fullMedia}
                />
              ) : (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={800}
                  height={600}
                  className={classes.fullMedia}
                />
              )}

              {/* Video (if provided) */}
              {project.videoUrl && (
                <video controls className={classes.fullMedia}>
                  <source src={project.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Audio (if provided) */}
              {project.audioUrl && (
                <audio controls className={classes.fullMedia}>
                  <source src={project.audioUrl} />
                  Your browser does not support the audio element.
                </audio>
              )}
            </>
          )}
        </div>

        <div className={classes.modalDescription}>
          <p>{project.description}</p>

          {/* Open Live Page button if livePath exists and we are not embedding */}
          {project.livePath && !shouldEmbed && (
            <div className={classes.modalActions}>
              <Link href={project.livePath} className={classes.openButton}>
                Open Live {project.title.includes("Dashboard") ? "Dashboard" : "Project"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects by selected category
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className={classes.galleryContainer}>
      {/* Category Buttons */}
      <div className={classes.categories}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${classes.categoryButton} ${
              selectedCategory === category ? classes.active : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className={classes.gallery}>
        {filteredProjects.map((project) => {
          const CardInner = (
            <>
              {typeof project.imageUrl === "string" ? (
                <img
                  src={project.imageUrl}
                  alt={project.category}
                  className={classes.image}
                />
              ) : (
                <Image
                  src={project.imageUrl}
                  alt={project.category}
                  width={500}
                  height={300}
                  className={classes.image}
                />
              )}
              <p className={classes.title}>{project.title}</p>
            </>
          );

          // If the project has livePath, navigate directly to that page on click (skip Modal)
          if (project.livePath) {
            return (
              <Link
                key={project.id}
                href={project.livePath}
                className={classes.itemLink}
                aria-label={`Open ${project.title}`}
              >
                <div className={classes.item}>{CardInner}</div>
              </Link>
            );
          }

          // Otherwise, open Modal (paintings, etc.)
          return (
            <div
              key={project.id}
              className={classes.item}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedProject(project);
              }}
              aria-label={`Open ${project.title}`}
            >
              {CardInner}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedProject && (
        <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Gallery;