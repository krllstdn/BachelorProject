from sksurv.column import encode_categorical
from sksurv.column import standardize


class DeceasedCoxnetPipeline:
    def __init__(self) -> None:
        # this is not supposed to work. just pseudocode
        # input: some json

        categorical_x = encode_categorical(dataset[self.yes_categorical])
        numerical_x = standardize(dataset[self.yes_numerical])

        X = pd.concat([numerical_x, categorical_x], axis=1)
