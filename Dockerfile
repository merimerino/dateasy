# Start from the Go base image
FROM golang:1.23-alpine

# Set the working directory inside the container
WORKDIR /app

# Initialize a Go module for the project
RUN go mod init backend

# Copy the entire backend source code into the container
COPY backend/ .

# Download dependencies (will auto-generate go.sum)
RUN go get ./...

# Build the Go application
RUN go build -o main .

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["./main"]
