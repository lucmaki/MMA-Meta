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

Notes: 
- Graphs are clickable to open interactive versions.
- Given the blog is already long enough, we exclude variance in analyses of yearly averages. 

# Part 1: The MMA Meta

## Has the meta changed?
Before digging into specifics, let's check whether the meta has broadly changed over the decades. Through Primary Components Analysis (PCA), we perform dimension reduction to visualise the historical match data through 3 primary components (PC), i.e. the 3 directions of highest variance. The lighter the dot, the more recent the match.
{% include "graphs/pca_3d.html" %}
Older matches appear broadly more distant to newer matches, which indicates an evolution of the meta. 

Though, it is somewhat hard to see... so, let's just look at PC1, i.e. the main source of variance.  

<a href="#" onclick="window.open('/graphs/pca_1d.html', 'newwindow'); return false;"><img src="/imgs/pca_1d.png"></a>

There is a trend of match characteristics diverging towards a certain direction over the years, and higher variance from increasing UFC matches over time.

Let's dig into the data to find out what has changed.

## Standing Game
Broadly, MMA can be divided into the standing game and ground game; fighting standing and fighting after a takedown/knockdown. We start with the standing game, who's attacks can be categorized as strikes and takedowns. How have their average yearly frequencies evolved over time?

<a href="#" onclick="window.open('/graphs/strikes_per_min_over_time.html', 'newwindow'); return false;"><img src="/imgs/strikes_per_min_over_time.png"></a>

Strike attempts have become more and more frequent, from a yearly average of around 6 in 2000, to 11 in 2022.

On the other hand, their accuracy have decreased greatly from its peak of 75% in 2001, stabilizing to around 52% from 2010 until 2020. However, it has started seeing a spike increase above 55% since 2020.

This paints the picture of a volume-centric strike strategy, with a cost in accuracy; a cost which is seeing signs of decreasing. 

What about takedowns?

<a href="#" onclick="window.open('/graphs/tkd_per_min_over_time.html', 'newwindow'); return false;"><img src="/imgs/tkd_per_min_over_time.png"></a>

Takedown attempts and accuracy have stabilized at a lower point over time. We note that both attempts and accuracy had a major uptick in the last year, 2022. Both trends' noisy starts comes from low takedown samples at a time where there were fewer UFC matches. 

The trends of takedown attempts can be seperated into three groups: high variance oscilation between 0.25-0.39 attempts per minute between 2000-2010, which settled into a stable 0.29-0.30 between 2010-2014. Then a valley of 0.24-0.28 between 2015-2022.

Simiarly, accuracy saw a noisy start of range 27%-56% between 2000-2005, into a generally decreasing trend of range 55%-34% between 2005-2011, so as to reach a somewhat stable range of 34%-40% between 2011-2022.

Overall, to compare strikes and takedowns: strike attempts are more than an order of magnitude more frequent than takedown attempts, and that difference has only grown over time. So, generally speaking, striking dominates the standing game.However, takedowns are pivotal attacks if landed, transitioning the fight to the ground. Given their accuracy is not that much lower than those of strikes, their infrequency must not be mistaken for ineffectiveness.

### Nuances of Striking
There is much more complexity to strikes than volume and accuracy, and given their dominance over the standing game, it is important to delve into their details to understand the standing game meta.

To dive deeper into their development over time, let's look at changes in their various characteristics.

#### Distance
In strike-oriented martial arts, there is a distinction made between infighters and outfighters: the respective tendency to fight up-close or by maintaining distance. Let's look at how strike distance has evolved in MMA. 

<a href="#" onclick="window.open('/graphs/proportions_strike_distance_over_time.html', 'newwindow'); return false;"><img src="/imgs/proportions_strike_distance_over_time.png"></a>

Over the decades, there has been a fairly steady trend towards striking from a distance over strikes at clinch distance. In other words, the striking meta has progressed towards outfighting. This ties with the inhibited ability to attempt takedowns; generally requiring to be at close range.

<a href="#" onclick="window.open('/graphs/strike_acc_by_distance_over_time.html', 'newwindow'); return false;"><img src="/imgs/strike_acc_by_distance_over_time.png"></a>

Strike accuracy at both distances have been on a slight upward trajectory for the last decade. Clinch strikes have always been much more accurate than distance strikes, which makes sense intuitively; farther attacks would be easier to avoid.

#### Target
What about where strikes are aimed? Which body parts between head, body and legs?

<a href="#" onclick="window.open('/graphs/proportions_strike_target_over_time.html', 'newwindow'); return false;"><img src="/imgs/proportions_strike_target_over_time.png"></a>

Unsurprisingly, aiming for the head has always been overwhelmingly the favored target, sitting fairly steadily around 80%. Leg kicks have plateaud, despite a period of popularity between 2000 and 2005. Meanwhile, body blows ever so slowly increased in frequency over time.

<a href="#" onclick="window.open('/graphs/strike_acc_by_target_over_time.html', 'newwindow'); return false;"><img src="/imgs/strike_acc_by_target_over_time.png"></a>

For all targets, accuracies has trended downward passed 2001, until around 2010 where they've started slowly improving over time (2015 for body strikes). After 2020, all target accuracies saw a sudden noticable increase.

There is an inverse correlation between strike target frequency and its accuracy; targets that are more frequently aimed at are the least accurate. An intuition for this is that the more situational the attack, the more certain landing it is when the opportunity to aim for it does appear. For example, a low kick being difficult to avoid but requiring more commitment and thus risk to be thrown, when compared to a jab to the head, which is popular for its low commitment and low risk, despite low accuracy.


#### Significance

There is one more way to categorize strikes; by their significance. In other words, strikes that could seriously damage if landed, versus those that were thrown without that intent.

<a href="#" onclick="window.open('/graphs/proportions_strike_sig_over_time.html', 'newwindow'); return false;"><img src="/imgs/proportions_strike_sig_over_time.png"></a>

Over time, the meta is developing around attempts at decisive blows; from 49% in the 2000, to 63% in 2022. This growth has plateaud.

I assumed the focus on outfighting would lead to more minimal strikes, but it ended up the other way around. This indicates that the outfighting meta is an aggressive kind, which ties to the earlier insight about overall strike frequency having increased.

<a href="#" onclick="window.open('/graphs/strike_acc_by_sig_over_time.html', 'newwindow'); return false;"><img src="/imgs/strike_acc_by_sig_over_time.png"></a>

Since 2009, significant strikes have become more accurate over time (from 39% to 48%), Meanwhile, minimal strikes have grown a little less accurate over time, from 93% to 88% since 2000.

Despite that, minimal strikes remain overwhelmingly more accurate than significant blows. This is because minimal strikes have lower bodily commitment; prioritizing increasing speed and lowering tells, over power. Such as is the case with jabs compared to crosses; the faster lead hand versus the stronger read hand.


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
