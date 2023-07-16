---
title: MMA Meta
layout: base.njk
---
# Table of Contents
- [Introduction](#introduction)
- [Part 1: The MMA Meta](#part-1-the-mma-meta)
  - [Has the meta changed?](#has-the-meta-changed)
  - [Standing Game](#standing-game)
    - [Nuances of Striking](#nuances-of-striking)
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


# Introduction
MMA (Mixed Martial Arts) is a combat sport which allows most forms of attacks: punches, kicks, knees, elbows, takedowns, chokes, locks.Fighting continues even after dropping to the ground, until the opponent gives up, is knocked out, or time runs out. The sport has thus earned a unique reputation as an evolving melting pot of martial arts; what sticks and what doesn't? 

So, how has the meta of MMA evolved over the decades? "Meta" is shorthand for the "metagame", which refers to the current strategic methods and dominant playstyles. We base our analysis on a dataset of [UFC matches](https://www.kaggle.com/datasets/danmcinerney/mma-differentials-and-elo), the sport's most popular promotion company. It stops at 2023.

Afterwards, we train a predictive model on all these match statistics, that guesses the winner of a match based on the past historical fight data of its two combatants.

Note: Graphs are clickable to open interactive versions.

# Part 1: The MMA Meta

## Has the meta changed?
Before digging into specifics, let's check whether the meta has broadly changed over the decades. Through Primary Components Analysis (PCA), we perform dimension reduction to visualise the historical match data through 3 primary components (PC), i.e. the 3 directions of highest variance. The lighter the dot, the more recent the match.
{% include "graphs/pca_3d.html" %}
Older matches appear broadly more distant to newer matches, which indicates an evolution of the meta. 

Though, it is somewhat hard to see... so, let's drop primary components, one at a time. Given PCs are ordered based on highest variance, this essentially means honing in on that variance.  

<a href="#" onclick="window.open('/graphs/pca_2d.html', 'newwindow'); return false;"><img src="/imgs/pca_2d.png"></a>

<a href="#" onclick="window.open('/graphs/pca_1d.html', 'newwindow'); return false;"><img src="/imgs/pca_1d.png"></a>

From the main primary component (PC1), there is a clear trend of match characteristics diverging towards a certain direction over the years, but also broadening. 

Let's dig into the data to find out what has changed.

## Standing Game
Broadly, MMA can be divided into the standing game and the game while on the ground. We start with the standing game, who's attacks can be categorized as strikes and takedowns. How have their average yearly frequencies evolved over time?

<a href="#" onclick="window.open('/graphs/strikes_per_min_over_time.html', 'newwindow'); return false;"><img src="/imgs/strikes_per_min_over_time.png"></a>

Strike attempts have become more and more frequent. However, their accuracy have decreased greatly, until 2010 where it stabilized to around 52%, but has started seeing a spike increase above 55% for the last 3 years. 

Overall, a volume-centric strike strategy, with a cost in accuracy that is improving. 

What about takedowns?

<a href="#" onclick="window.open('/graphs/tkd_per_min_over_time.html', 'newwindow'); return false;"><img src="/imgs/tkd_per_min_over_time.png"></a>

On the other hand, takedown attempts and their accuracy have decreased, albeit with a much more noisy trend (likely due to much lower count per match compared to strikes, i.e. higher variance). Accuracy has stabilized around 37% in the past decade. This indicates that the meta surrounding the execusion of (and/or defense against) takedowns has stabilized, but not the opportunities/choice of when to use them. However, we mote that both attempts and accuracy had a noticable increase in the last year. 

Overall, strike attempts are more than an order of magnitude more frequent than takedown attempts, and that difference has only grown over time. So, generally speaking, striking dominates the standing game. 

However, takedowns are pivotal attacks if landed, that transition the fight to the ground. As such, their accuracy not being too lower than strikes means that their constant threat remain forms an important part of the standing game.

### Nuances of Striking
There is much more complexity to strikes than volume and accuracy, and given their dominance over the standing game, understanding their nuance provides insight over the standing game meta.

To dive deeper into their development over time, let's look at changes in their various characteristics.

#### Distance
In strike-oriented martial arts, there is a distinction made between infighters and outfighters: the respective tendency to fight up-close or by maintaining distance. Let's look at how strike distance has evolved in MMA. 

<a href="#" onclick="window.open('/graphs/proportions_strike_distance_over_time.html', 'newwindow'); return false;"><img src="/imgs/proportions_strike_distance_over_time.png"></a>

Over the decades, there has been a fairly steady trend towards striking from a distance over strikes at clinch distance. In other words, the striking meta has progressed towards outfighting. This ties with the inhibited ability to attempt takedowns, given it's generally performed at close range.

<a href="#" onclick="window.open('/graphs/strike_acc_by_distance_over_time.html', 'newwindow'); return false;"><img src="/imgs/strike_acc_by_distance_over_time.png"></a>

Strike accuracy at both distances have been on a slight upward trajectory for the last decade. Clinch strikes have always been much more accurate than distance strikes, which is intuitively unsurprising; farther attack means easier to avoid.

#### Target
What about where strikes are aimed? Which body parts between head, body and legs?

<a href="#" onclick="window.open('/graphs/proportions_strike_target_over_time.html', 'newwindow'); return false;"><img src="/imgs/proportions_strike_target_over_time.png"></a>

Unsurprisingly, aiming for the head has always been overwhelmingly the favored target, sitting fairly steadily around 80%. Leg kicks have plateaud, while having had a period of popularity between 2000 and 2005. Meanwhile, body blows ever so slowly increased in frequency over time.

<a href="#" onclick="window.open('/graphs/strike_acc_by_target_over_time.html', 'newwindow'); return false;"><img src="/imgs/strike_acc_by_target_over_time.png"></a>

All target strike accuracies trended downward past 2001, until past 2010 (2015 for body strikes), where they've started slowly improving over time. Past 2020, all target accuracies saw a sudden noticable increase.

Strike targets that are more frequently aimed at are the least accurate. An intuition for this is that the more situational the attack, the more certain landing it is when the opportunity does appear. As opposed to, say, the common jab to the head, which is so common because it's an opening move; a pawn meant to create opportunities.


#### Significance

<a href="#" onclick="window.open('/graphs/proportions_strike_sig_over_time.html', 'newwindow'); return false;"><img src="/imgs/proportions_strike_sig_over_time.png"></a>

Interestingly, one might think that a focus on outfighting means 

<a href="#" onclick="window.open('/graphs/strike_acc_by_sig_over_time.html', 'newwindow'); return false;"><img src="/imgs/strike_acc_by_sig_over_time.png"></a>

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
