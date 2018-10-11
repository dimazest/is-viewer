export const ANNOTATION_SELECTED = 'ANNOTATION_SELECTED'
export const annotationSelected = (annotationID) => {
    return {
        type: ANNOTATION_SELECTED,
        annotationID
    }
}
