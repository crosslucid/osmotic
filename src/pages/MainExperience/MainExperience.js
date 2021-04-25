import round from 'lodash/round';
import Video from '../../components/Video';

const detectNoseOffset = (keypoints, width, height) => {
  if (!keypoints || !keypoints.nose) return { x: 0, y: 0 };
  const { position } = keypoints.nose;

  return {
    x: round((position.x - width / 2) / width, 3),
    y: round((position.y - height / 2) / height, 3),
  }
}

const MainExperience = () => {
  const video = document.getElementById('backgroundVideo');
  return (
    <Video video={video} />
  )
}

export default MainExperience;