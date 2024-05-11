
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/maria-iut1234/QuizzyPedia">
    <!-- <img src="client/src/assets/favicon.ico" alt="Logo" width="40" height="70"> -->
  </a>

  <h3 align="center">QuizzyPedia</h3>

  <p align="center">
    An mcq quiz application created using NextJS for both backend and frontend development
    <br>
    <!-- <a href="https://innuo.netlify.app/">Innuo Website</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary><h3>Table of Contents<h3></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

(This project was created for the academic course SWE4638 - Web And Mobile Application Development Lab).


QuizzyPedia is an engaging and fun quiz application designed to make learning enjoyable. With its simple, vibrant and user-friendly interface, QuizzyPedia offers a wide range of quizzes across various topics, from general knowledge to specific subjects. 

Users can start their learning journey by selecting a quiz and answering questions within a set time limit. The application provides instant feedback on correct and incorrect answers, helping users learn as they progress. 

Users also have the option to create any quiz according to their custom preferances.

With its interactive features and seamless navigation, QuizzyPedia promises an educational experience filled with excitement and discovery.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* ![React](https://img.shields.io/badge/-React-61DBFB?style=for-the-badge&labelColor=black&logo=react&logoColor=61DBFB)
* ![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Please follow the steps below to run the project locally:

### Prerequisites

You will require a .env file before you can start running the project.
* Create a file named `.env` in the download folder.
* Populate the file with the following environment variables according to your environment:
  ```sh
  MONGODB_URI =
  JWT_KEY =
  ```
* The `MONGODB_URI` variable is the mongoDB link to the database used to store all the website information.
* `JWT_KEY` can be set according to user preferance.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/maria-iut1234/QuizzyPedia.git
   ```
2. Start the server
   ```bash
   npm run dev
   ```
3. Go to the following link to use the website locally:
   ```yaml
   http://localhost:3000/
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

QuizzyPedia has the following functionalities:

**1. Users can create accounts**

**2. Users can participate in MCQ styled evaluation for learning**
   - The quizzes are timed to induce a sense of competitiveness.
 
**3. Users can check their quiz answers immediately**
   - Instant feedback is given to the user upon answering.

**4. Users can contribute to the platform by creating new quizzes**
   - Add new quizzes to existing database.

**5. Optimized quiz fetching using pagination**
   - Per page, only the previous, current and immediate next page quizzes are fetched
   - This, as opposed to fetching the entire list of quizzes at once, is more efficient in showing quiz results to users.
   

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

This project is licensed under the [MIT License](LICENSE).

<!-- CONTACTS -->
## Contact:

- **Shanta Maria**
  - *GitHub:* [maria-iut1234](https://github.com/maria-iut1234)

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Img Shields](https://shields.io)
* [GitHub ReadMe Template](https://github.com/othneildrew/Best-README-Template/tree/master)

<p align="right">(<a href="#readme-top">back to top</a>)</p>