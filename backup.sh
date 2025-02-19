#!/bin/bash

# 复制 .memory_spiral.json 到 .backup.memory_spiral.json
cp ~/.memory_spiral.json ./.backup.memory_spiral.json

# 检查文件是否成功复制
if [ $? -eq 0 ]; then
  echo "文件成功复制到 .backup.memory_spiral.json"
else
  echo "文件复制失败"
  exit 1
fi

# 添加文件到 git 索引
git add .

# 提交更改
git commit -m "Backup .memory_spiral.json"

# 推送更改到远程仓库
git push

exit 0