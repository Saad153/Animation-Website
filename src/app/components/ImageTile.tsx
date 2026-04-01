import { motion, MotionValue } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";

interface ImageTileProps {
  project: Project;
  index: number;
  offsetX?: MotionValue<number>;
  offsetY?: MotionValue<number>;
}

export function ImageTile({ project, index, offsetX, offsetY }: ImageTileProps) {
  const navigate = useNavigate();
  const { tileStyle } = project;

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        width: tileStyle.width,
        height: tileStyle.height,
        top: tileStyle.top,
        left: tileStyle.left,
        x: offsetX,
        y: offsetY,
      }}
      initial={{ opacity: 0, scale: 0.7, rotate: tileStyle.rotate, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, rotate: tileStyle.rotate, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: 0.3 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.06, zIndex: 20, rotate: 0 }}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div className="relative w-full h-full overflow-hidden shadow-2xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 border border-transparent group-hover:border-white/40 transition-all duration-500" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

        {/* Hover overlay with title + arrow */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          <div className="flex items-end justify-between">
            <div>
              <span
                className="text-white uppercase tracking-[0.1em] block"
                style={{ fontSize: "11px" }}
              >
                {project.title}
              </span>
              <span
                className="text-white/50 uppercase tracking-[0.1em]"
                style={{ fontSize: "9px" }}
              >
                {project.category}
              </span>
            </div>
            <ArrowUpRight size={14} className="text-white/70" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
