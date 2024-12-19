declare global {
  interface Window {
    electronAPI: {
      // 声明一个读取 JSON 文件的方法，返回的是一个 Promise，解析后的 JSON 数据
      readJson: () => Promise<any>;  // 根据您的 JSON 数据结构，可以调整类型
      saveHabits: (habits: string) => void

    };
  }
}

export {};  // 确保这个文件被当作模块来处理
