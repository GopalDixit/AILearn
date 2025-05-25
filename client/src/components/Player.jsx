import styles from "./Player.module.css";
const Player = ({ youtube }) => {
  return (
    <div className={styles.vcontainer}>
      <iframe
      
        width="100%"
        height="670"
        src={youtube}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        frameborder="10"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default Player;
