
echo "Copying coxnet living model and pipeline..."
cp pickle/COXNET_LIVING_MODEL.pickle ../Application/models/COXNET_LIVING_MODEL.pickle
# cp pickle/COXNET_LIVING_MODEL.pickle ../Application/Backend/prediction/models/COXNET_LIVING_MODEL.pickle
cp pickle/pipeline_coxnet_living.pkl ../Application/Backend/prediction/pickles/coxnet_living_pipeline.pkl

echo "Copying coxnet deceased model and pipeline..."
cp pickle/COXNET_DECEASED_MODEL.pickle ../Application/models/COXNET_DECEASED_MODEL.pickle
# cp pickle/COXNET_DECEASED_MODEL.pickle ../Application/Backend/prediction/models/COXNET_DECEASED_MODEL.pickle
cp pickle/trained_pipeline.pkl ../Application/Backend/prediction/pickles/pipeline_coxnet_deceased_pipeline.pkl
