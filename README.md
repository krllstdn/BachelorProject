# Estimating patient's life expectancy after a successful kidney transplant using machine learning methods

Abstract: Kidney transplantation is the gold standard treatment for kidney failure that provides an increased quality of life and a longer life expectancy compared to dialysis. Before transplantation, donor-recipient compatibility is maximized in hopes of better outcomes, yet long-term survival remains uncertain due to being notoriously hard to predict and lack of accurate predictive tools for long-term post-transplant outcomes. This thesis attempts to bridge this gap by training several predictive machine learning models for living donor (LDT) and deceased donor transplantations (DDT), including Cox elastic net regression, random survival forests, and gradient-boosted decision trees, to estimate long-term survival probabilities. LDT models achieved an Uno concordance index of 0.72 and an integrated Brier score (IBS) of 0.136, while DDT models achieved an Uno c-index of 0.69 and an IBS of 0.162. Leveraging these models, an application was developed to aid clinicians in decision-making, potentially improving patient outcomes.



## Repository Structure
**Application**: Contains the dockerized Django Rest Framework back end and the React front end of the application. Instructions on how to deploy it are provided as well.

**Code**: Contains necessary jupyter notebooks.

**Thesis**: Contains the  `.lyx` file, the resulting PDF, and all necessary graphs for the PDF generation. 
