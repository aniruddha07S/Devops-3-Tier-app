// Runs on first MongoDB container start (via docker-compose volume mount)
db = db.getSiblingDB("devops-app");

db.tasks.insertMany([
  { title: "Set up Docker Compose", completed: false },
  { title: "Add GitHub Actions CI", completed: false },
  { title: "Deploy to Minikube", completed: false },
]);

print("Seeded devops-app database with sample tasks");
