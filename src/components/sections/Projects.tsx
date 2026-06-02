"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

type ProjectWithRelations = any; // Replace with actual type from your database

interface ProjectsProps {
  dict: any;
  projects: ProjectWithRelations[];
  categories: any[];
}

export function Projects({ dict, projects, categories }: ProjectsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProjects =
    selectedCategory === "all" ? projects : (
      projects.filter((p) => p.category.slug === selectedCategory)
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" ref={ref} className="py-20 md:py-32">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="section-title">{dict.projects.title}</h2>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === "all" ?
                  "bg-light-accent dark:bg-dark-accent text-white"
                : "glass-effect hover:bg-light-accent/10 dark:hover:bg-dark-accent/10"
              }`}
            >
              {dict.projects.all}
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.slug ?
                    "bg-light-accent dark:bg-dark-accent text-white"
                  : "glass-effect hover:bg-light-accent/10 dark:hover:bg-dark-accent/10"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  variants={itemVariants}
                  className="group card hover:shadow-2xl transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="relative h-48 mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-light-accent/20 to-purple-600/20 dark:from-dark-accent/20 dark:to-blue-400/20">
                    {project.images[0] ?
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    : <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl font-bold opacity-20">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    }

                    {/* Featured Badge */}
                    {project.isFeatured && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full glass-effect text-xs font-semibold">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-clamp-2">
                      {project.shortDescription}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech: any) => (
                        <span
                          key={tech.id}
                          className="px-3 py-1 text-xs rounded-full bg-light-bg dark:bg-dark-bg font-medium"
                        >
                          {tech.name}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 text-xs rounded-full bg-light-bg dark:bg-dark-bg font-medium">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      {project.liveLink && (
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 btn-primary text-sm flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {dict.projects.viewProject}
                        </motion.a>
                      )}
                      {project.githubLink && (
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 glass-effect rounded-full hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
