# Start from the Go base image
FROM golang:1.23-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum first to leverage Docker cache
COPY go.mod go.sum ./
RUN go mod download

# Copy the entire backend source code into the container
COPY . . 

# Build the Go application
RUN go build -o main .

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["./main"]
