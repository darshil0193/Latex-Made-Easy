# Latex-Made-Easy

[![Build Status](https://travis-ci.org/darshil0193/Latex-Made-Easy.svg?branch=master)](https://travis-ci.org/darshil0193/Latex-Made-Easy?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/darshil0193/Latex-Made-Easy/badge.svg?branch=master)](https://coveralls.io/github/darshil0193/Latex-Made-Easy?branch=master)

### Introduction
Our project mainly focuses on helping the techies to avoid writing latex code. Our app will be providing UI components to the users for all the complex items encountered while writing a technical document (eg. equations, tables, titles, authors etc.) At the end, once the user provides the data, the app will generate downloadable latex code for the document and also provide a downloadable pdf corresponding to the document. We are aiming to reduce the time taken by the users for writing latex code even if that is using templates as UI components will make it much more convenient for use.

### Project Execution

Please install [git](https://git-scm.com/downloads), and [nodejs](https://nodejs.org/en/download) prior to executing the application.

You can clone the project using:

```git clone https://github.com/darshil0193/Latex-Made-Easy.git ```

Once cloned, please run:

```
npm install
npm install -g grunt-cli
npm install -g bower
bower install
grunt serve
```

This should open up the application in your default browser.

Once the user registers in the system, they can log in to the application and fill up the required data and click on the 'Get Latex' Button which will allow them to retrieve the latex code for the data provided.

Please make sure that currently the application follows just one template and we are planning to add new templates in the future.

If you want to contribute to this project please follow the steps in [CONTRIBUTING.md](https://github.com/darshil0193/Latex-Made-Easy/blob/master/CONTRIBUTING.md)
