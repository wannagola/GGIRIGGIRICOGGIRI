import fs from 'fs';
import path from 'path';

export interface MediaFile {
  name: string;
  path: string;
  type: 'image' | 'video';
}

const PICTURES_DIR = path.join(process.cwd(), 'public', 'assets', 'pictures');
const VIDEOS_DIR = path.join(process.cwd(), 'public', 'assets', 'videos');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.avi', '.MP4', '.WEBM', '.MOV', '.AVI'];

export function getMediaFiles(type: 'images' | 'videos'): MediaFile[] {
  const dir = type === 'images' ? PICTURES_DIR : VIDEOS_DIR;
  const extensions = type === 'images' ? IMAGE_EXTENSIONS : VIDEO_EXTENSIONS;

  try {
    if (!fs.existsSync(dir)) {
      return [];
    }

    const files = fs.readdirSync(dir);
    
    // 파일 정보 수집 (수정 시간 포함)
    const filesWithStats = files
      .filter(file => {
        const ext = path.extname(file);
        return extensions.includes(ext);
      })
      .map(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          mtime: stats.mtime.getTime()
        };
      });

    // 수정 시간 기준 정렬
    const sortedByTime = [...filesWithStats].sort((a, b) => b.mtime - a.mtime);
    
    // 최근 14개 추출
    const recent14 = sortedByTime.slice(0, 14);
    const rest = sortedByTime.slice(14);
    
    // 나머지는 파일명 역순 정렬
    const sortedRest = rest.sort((a, b) => b.name.localeCompare(a.name));
    
    // 최근 14개 + 나머지 합치기
    const finalOrder = [...recent14, ...sortedRest];
    
    return finalOrder.map(file => ({
      name: file.name,
      path: `/assets/${type === 'images' ? 'pictures' : 'videos'}/${file.name}`,
      type: type === 'images' ? 'image' : 'video'
    }));
  } catch (error) {
    console.error(`Error reading ${type} directory:`, error);
    return [];
  }
}
