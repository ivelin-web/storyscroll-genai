export interface StorySection {
  id: string;
  headline: string;
  content: string;
  imageKeyword: string; // Used to seed the image
  colorAccent: string; // Hex code for ambient light
}

export interface StoryData {
  topic: string;
  title: string;
  subtitle: string;
  sections: StorySection[];
}

export enum AppState {
  IDLE,
  GENERATING,
  VIEWING,
  ERROR
}