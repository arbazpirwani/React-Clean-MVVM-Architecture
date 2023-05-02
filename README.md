# React Clean MVVM Architecture

This project is an implementation of a clean and maintainable React application based on the MVVM (Model-View-ViewModel) architectural pattern. It demonstrates best practices such as the SOLID principles, object calisthenics, clean architecture, and clean code. The project aims to provide a solid foundation for building scalable and maintainable React applications, serving as a helpful resource for the community.

## Overview

The project is organized into different layers, each with its own responsibility, ensuring a clear separation of concerns. The main layers of the architecture are:

- Core: Contains utility classes and reusable components.
- Data: Handles API interactions, network communication, and data transformations.
- Domain: Contains the business logic, use cases, and entity models.
- Presentation: Manages UI components, state management, and dependency injection.

## Project Structure

```
src/
│
├─ core/ 
│   └─ utils/ 
│
├─ data/ 
│   ├─ api/ 
│   ├─ constant/ 
│   ├─ entity/ 
│   ├─ network/ 
│   └─ repository/ 
│
├─ domain/ 
│   ├─ model/ 
│   ├─ repository/ 
│   └─ usecase/ 
│       └─ book/ 
│
└─ presentation/ 
    ├─ di/ 
    ├─ pages/ 
    └─ routes/ 
```

## Getting Started

Follow these steps to set up and run the project on your local machine:

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- Git

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your_username/React-Clean-MVVM-Architecture.git
   ```

2. Change into the project directory:

   ```
   cd React-Clean-MVVM-Architecture
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Run the development server:

   ```
   npm start
   ```

   The application should now be running on `http://localhost:3000`.

## Contributing

We welcome contributions from the community to improve this project. To contribute, please follow these steps:

1. Fork the project repository.
2. Create a new feature branch from the `main` branch.
3. Make your changes and commit them with a clear and descriptive commit message.
4. Push your changes to the feature branch on your fork.
5. Open a pull request targeting the `main` branch in the original repository.

Please make sure to read and follow the [Code of Conduct](CODE_OF_CONDUCT.md) and [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.