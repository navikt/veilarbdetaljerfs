import { useAppStore } from '../stores/app-store';
import { useFeatureToggle } from '../data/api/fetch';
import { Errormelding, Laster } from '../components/felles/minikomponenter';

function FeatureFetcher() {
    const { setFeatures } = useAppStore();
    const { data: featureData, error: featureError, isLoading: featureLoading } = useFeatureToggle();

    if (featureData) {
        setFeatures(featureData);
    }

    if (featureLoading) {
        return <Laster />;
    }
    if (featureError?.status === 204 || featureError?.status === 404) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (featureError) {
        return <Errormelding />;
    }

    return featureData;
}

export default FeatureFetcher;
