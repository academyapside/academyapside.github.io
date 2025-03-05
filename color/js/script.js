document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star-rating input[type="radio"]');
    const ratingValue = document.getElementById('rating-value');

    stars.forEach(star => {
        star.addEventListener('change', function () {
            ratingValue.textContent = `Vous avez noté ${this.value} étoile(s).`;
        });
    });
});

// Configuration des données du graphique
const data = {
    labels: ['Textes alternatifs manquants', 'Contraste insuffisant', 'Navigation au clavier', 'Balises manquantes', 'Formulaires non accessibles'],
    datasets: [{
        label: 'Principales erreurs d\'accessibilité',
        data: [30, 20, 15, 25, 10], // Données d'exemple
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
    }]
};

// Options du graphique
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function(tooltipItem) {
                    let dataset = tooltipItem.dataset;
                    let currentValue = dataset.data[tooltipItem.dataIndex];
                    return currentValue + '%';
                },
                title: function(tooltipHeader){
                    return "";
                }
            }
        }
    }
};

// Initialisation du graphique
const ctx = document.getElementById('accessibilityErrorsChart').getContext('2d');
const accessibilityErrorsChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});