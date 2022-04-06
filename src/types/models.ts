export interface ModelType {
  imgUrl: string;
  mdId: string;
  tags: Tags[];
  from: string;
}

export enum Tags {
  横向 = "X",
  竖向 = "Y",
  着衣 = "Clothes",
  人体 = "Body",
  男性 = "Male",
  女性 = "Female",
  头像 = "Header",
  手足 = "HandsFeet",
  半身 = "Half",
  组合 = "Group",
  静物 = "Still",
  视频 = "Video",
  结构 = "Structure",
  线描 = "LineDrawing",
  卡通 = "Cartoon",
}
