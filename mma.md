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

So, how has the meta of MMA evolved over the decades? "Meta" is shorthand for the "metagame", which refers to the current strategic methods and dominant playstyles. We base our analysis on a dataset of [UFC matches](https://www.kaggle.com/datasets/danmcinerney/mma-differentials-and-elo), the sport's most popular promotion company.

## Has the meta changed?
Before digging into specifics, let's check if the meta has actually broadly changed over the decades. Through Primary Components Analysis (PCA), we perform dimension reduction to visualise the data through 3 primary components (PC), i.e. the 3 directions of highest variance. Darker entries are older matches, lighter are newer. 
{% include "graphs/pca_3d.html" %}
Older matches appear broadly more distant to newer matches, which indicates an evolution of the meta. 

Though, it is somewhat hard to see... so, let's drop primary components, one at a time. Given PCs are ordered based on highest variance, this essentially means honing in on that variance.  

<img src="/imgs/pca_2d.png">

<img src="/imgs/pca_1d.png">

From the main primary component (PC1), there is a clear trend of match characteristics diverging towards a certain direction over the years, but also expanding in their variety. 

Let's dig into the data to find out what has changed.

## Standing Game
Broadly, MMA can be divided into the standing game and the grounded game. While linked, both are different disciplines with their own metas, requiring different skillsets and strategies.

We start with the standing game, who's attacks can be categorized as strikes and takedowns (if the latter is landed, the fight transitions to the ground game). How has the proportions of attempted strikes and takedowns evolved over time?


<img src="/imgs/strikes_per_min_over_time.png">

Over time, attempting to strike the opponent has become more and more frequent. However, their accuracy has decreased greatly. This indicates a volume-centric strike strategy at the cost of precision.

<img src="/imgs/tkd_per_min_over_time.png">

On the other hand, takedown attempts have become less frequent. While their accuracy have a less apparent upward/downward trend, it has stabilized greatly compared to the past. This indicates that the meta surrounding the execusion of (and/or defense against) takedowns has stabilized, but not the opportunities/choice of when to use them.

Strike attempts are more than an order of magnitude more frequent than takedown attempts, and that difference has only grown over time. Suffice to say, striking is the overwhelming main tactic while standing.

### Striking Nuances
There is much more complexity to the striking meta than volume and accuracy. To dive deeper into their development over time, let's look at changes in their various characteristics.

#### Distance
<img src="/imgs/proportions_strike_distance_over_time.png">
<img src="/imgs/strike_acc_by_distance_over_time.png">

<!-- Plotly figure embed here -->

#### Target
<img src="/imgs/proportions_strike_target_over_time.png">
<img src="/imgs/strike_acc_by_target_over_time.png">

<!-- Plotly figure embed here -->

#### Significance
<img src="/imgs/proportions_strike_sig_over_time.png">
<img src="/imgs/strike_acc_by_sig_over_time.png">

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
