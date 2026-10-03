package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.Status;
import com.example.taskmanager.model.Priority;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        // Default status if not provided
        if (task.getStatus() == null) {
            task.setStatus(Status.PENDING);
        }
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updatedTaskDetails) {
        return taskRepository.findById(id).map(existingTask -> {
            existingTask.setTitle(updatedTaskDetails.getTitle());
            existingTask.setDescription(updatedTaskDetails.getDescription());
            existingTask.setStatus(updatedTaskDetails.getStatus());
            existingTask.setPriority(updatedTaskDetails.getPriority());
            existingTask.setDueDate(updatedTaskDetails.getDueDate());
            return taskRepository.save(existingTask);
        }).orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<Task> getTasksByStatus(Status status) {
        return taskRepository.findByStatus(status);
    }

    public List<Task> searchTasksByTitle(String keyword) {
        return taskRepository.findByTitleContainingIgnoreCase(keyword);
    }
}