import HashLoader from "react-spinners/HashLoader";
import { useEffect } from "react";

const Loading = ({ children, loading, style }) => {
  useEffect(() => {
    if (loading) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [loading]);
  return (
    <div
      className="loading-container"
      style={{
        position: "relative",
        ...style,
      }}
    >
      {loading && (
        <div
          className="loading-overlay"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: "9999",
            background: "rgba(255, 255, 255, 0.4)",
          }}
        >
          <HashLoader
            color="#FF8080"
            size="100px"
            speedMultiplier={1.5}
            loading={true}
            cssOverride={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "99999",
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default Loading;
