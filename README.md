# Simple Japanese Inheritance Tax Calculator

## Why?

I needed a small project to work on my currently non-existent frontend skills and this seemed like something I could hash out in about a day with satisfying results. Also it's cool if it can be of use to someone.

## Usage and Caveats

The app is published on Github Pages [here](https://w00kie.github.io/jpn-inheritance-tax/). As stated there, this only covers the case of a foreigner in Japan receiving an inheritance from abroad where no assets are located in Japan and all other heirs are foreigners outside of Japan. This seems to be the typical case for questions coming to [/r/JapanFinance](https://www.reddit.com/r/JapanFinance) and is also much simpler to implement.

This also assumes a standard case for the list of heirs where a parent has died and leaves their estate to children and/or a surviving spouse. So the statutory distribution is a basic equal split between all heirs with the exception of the spouse getting a minimum of 50%. More complex cases with grand-children of an already deceased child or siblings and nieces/nephews, etc. are out of scope.

## Tech Stack

For those interested, this is a simple one page [Vite + React app](https://vitejs.dev) with [shadcn/ui](https://ui.shadcn.com) components.

While I think I have an inkling of sense as to what I'm doing with React, I'm a total newb with TailwindCSS so bear with me...

## Feedback and Contributions

I will be happy to receive any and all feedback about both the UX/UI and the inner workings of the calculations. My code is fairly ugly right now so please forgive the mess. Feel free to open issues here or offer fixes through PRs.

Cheers,

François
