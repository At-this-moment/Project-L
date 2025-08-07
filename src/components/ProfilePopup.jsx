import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "./ProfileCard";
import "./ProfileCard.css";

export default function ProfilePopup({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="profile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="profile-popup"
            initial={{
              scale: 0.5,
              opacity: 0,
              y: -80,
              rotateX: -15,
            }}
            animate={{
              scale: 1.1,
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
              y: 30,
              rotateX: 8,
            }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 14,
              mass: 0.8,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ProfileCard
              name="Lee Hyunjae"
              title="1997.07.04"
              handle="At-this-moment"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/images/profile.png"
              miniAvatarUrl="/images/woojoo.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={true}
              onContactClick={() => window.location.href = "mailto:qnfdlf1997@gmail.com"}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
