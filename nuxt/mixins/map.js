export default {
    methods:
    {
        // стандартные настройки иконки маркера
        markerIcon(active = false)
        {
            return {
                layout: 'default#imageWithContent',
                imageSize: [50, 50],
                imageOffset: [18, -24],
                contentOffset: [-4, -4],
                contentLayout: `<div class="app_newbuildings_marker_wrap${active ? ' active' : ''}"><div></div></div>`
            }
        },
        getDistance(a, b)
        {
            let ax = parseFloat(a[0])
            let ay = parseFloat(a[1])
            let bx = parseFloat(b[0])
            let by = parseFloat(b[1])

            return Math.sqrt(Math.abs(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2)))
        }
    }
}