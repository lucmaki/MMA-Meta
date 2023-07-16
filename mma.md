---
title: MMA Meta
layout: base.njk
---
# Table of Contents

- [Part 1: The MMA Meta](#part-1-the-mma-meta)
  - [Has the meta changed?](#has-the-meta-changed)
  - [Standing Game](#standing-game)
    - [Striking Nuances](#striking-nuances)
      - [Distance](#distance)
      - [Target](#target)
      - [Significance](#significance)
  - [Ground Game](#ground-game)
  - [How did this affect match characteristics?](#how-did-this-affect-match-characteristics)
- [Part 2: Predicting Winners](#part-2-predicting-winners)
  - [Preparing Dataset](#preparing-dataset)
  - [Train](#train)
  - [Feature Selection](#feature-selection)
  - [Simplified Betting](#simplified-betting)

# Part 1: The MMA Meta
MMA (Mixed Martial Arts) is a combat sport which allows most forms of attacks: punches, kicks, knees, elbows, takedowns, chokes, locks. It has thus earned a unique reputation amongst combat sport as an evolving melting pot of martial arts; what sticks and what doesn't? 
Meta is short for "metagame," which refers to the strategies, tactics, and dominant playstyles that emerge within a competitive gaming environment

So, how has the meta of MMA evolved over the decades? "Meta" is shorthand for the "metagame", which refers to the current strategic methods and dominant playstyles. We base our analysis on a dataset of [UFC matches](https://www.kaggle.com/datasets/danmcinerney/mma-differentials-and-elo), the sport's most popular promotion company.

All graphs are interactive by clicking on them.

## Has the meta changed?
Before digging into specifics, let's check if the meta has actually broadly evolved over time. Through Primary Components Analysis (PCA), we perform dimension reduction to visualise the data through 3 primary components, i.e. the 3 directions of highest variance.
{% include "graphs/pca_scatter_3d.html" %}
Older matches appear broadly more distant to newer matches, which indicates a change in the meta. Let's reduce primary components further to 2, then to 1. 

<img src="/imgs/pca_2d.png">
<img src="/imgs/pca_1d.png">

For PC1 especifically, there is a clear trend of match characteristics diverging over the years. 
Let's dig into the data to find out what has changed.

## Standing Game
Broadly, MMA can be divided into the standing game and the grounded game. Both are almost different disciplines, requiring different skillsets and strategies. Some fighters might be better at one than the other.

We start with the standing game, who's attacks can be divided into striking and takedowns (if landed, the fight transitions to the ground game). How has the proportions of these two kind of attacks evolved over time?
<!-- Plotly figure embed here -->


### Striking Nuances

#### Distance

<!-- Plotly figure embed here -->

#### Target

<!-- Plotly figure embed here -->

#### Significance

<!-- Plotly figure embed here -->

## Ground Game

<!-- Plotly figure embed here -->

## How did this affect match characteristics?

<!-- Plotly figure embed here -->

# Part 2: Predicting Winners

## Preparing Dataset

<!-- Plotly figure embed here -->

## Train

<!-- Plotly figure embed here -->

## Feature Selection

<!-- Plotly figure embed here -->

## Simplified Betting
