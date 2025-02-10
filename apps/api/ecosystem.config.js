module.exports = {
  apps: [
    {
      name: 'memory-spiral', // 应用名称
      script: 'pnpm', // 使用 pnpm 命令启动
      args: 'start:prod', // 启动命令参数
      cwd: './', // 项目根目录
      instances: 1, // 启动最大实例数，可以设置为 'max' 以自动利用所有 CPU 核心
      exec_mode: 'fork', // 使用集群模式
      watch: false, // 如果需要热重载，设置为 true
      env: {
        NODE_ENV: 'production', // 设置环境变量
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // 日志的时间格式
      error_file: './logs/error.log', // 错误日志路径
      out_file: './logs/output.log', // 普通日志路径
      merge_logs: true, // 合并日志
    },
  ],
};