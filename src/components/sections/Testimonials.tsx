// "use client";

// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { Star } from "lucide-react";

// interface TestimonialsProps {
//   dict: any;
//   testimonials: any[];
// }

// export function Testimonials({ dict, testimonials }: TestimonialsProps) {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6 },
//     },
//   };

//   return (
//     <section
//       ref={ref}
//       className="py-20 md:py-32 bg-light-surface/50 dark:bg-dark-surface/50"
//     >
//       <div className="container-custom">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//         >
//           {/* Section Title */}
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <h2 className="section-title">{dict.testimonials.title}</h2>
//             <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mt-4">
//               {dict.testimonials.whatClientsSay}
//             </p>
//           </motion.div>

//           {/* Testimonials Grid */}
//           <div className="grid md:grid-cols-2 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={testimonial.id}
//                 variants={itemVariants}
//                 whileHover={{ y: -10 }}
//                 className="card"
//               >
//                 {/* Rating */}
//                 <div className="flex gap-1 mb-4">
//                   {Array.from({ length: testimonial.rating }).map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-5 h-5 fill-yellow-400 text-yellow-400"
//                     />
//                   ))}
//                 </div>

//                 {/* Content */}
//                 <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">
//                   "{testimonial.content}"
//                 </p>

//                 {/* Client Info */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-light-accent to-purple-600 dark:from-dark-accent dark:to-blue-400 flex items-center justify-center text-white font-bold">
//                     {testimonial.clientName.charAt(0)}
//                   </div>
//                   <div>
//                     <div className="font-semibold">
//                       {testimonial.clientName}
//                     </div>
//                     {testimonial.position && (
//                       <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
//                         {testimonial.position}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
