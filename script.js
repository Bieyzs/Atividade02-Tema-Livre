// ===== NAVEGACAO ENTRE SECOES =====
function showSection(sectionId) {
    // Previne comportamento padrao do link (abrir nova aba, scroll, etc.)
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Esconde todas as secoes
    document.querySelectorAll('.section').forEach(function(sec) {
        sec.classList.remove('active');
    });

    // Mostra a secao solicitada
    var targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Atualiza menu ativo
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.classList.remove('active');
    });

    // Marca o link clicado como ativo
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fecha menu mobile se aberto
    if (window.innerWidth <= 768) {
        var navLinks = document.getElementById('navLinks');
        var menuToggle = document.querySelector('.menu-toggle');
        if (navLinks) navLinks.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    }
}

// ===== MENU MOBILE =====
function toggleMenu() {
    var navLinks = document.getElementById('navLinks');
    var menuToggle = document.querySelector('.menu-toggle');
    if (navLinks) navLinks.classList.toggle('active');
    if (menuToggle) menuToggle.classList.toggle('active');
}

// ===== LOGIN OVERLAY =====
function openLogin() {
    var overlay = document.getElementById('loginOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLogin() {
    var overlay = document.getElementById('loginOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Fecha login ao clicar fora
var loginOverlay = document.getElementById('loginOverlay');
if (loginOverlay) {
    loginOverlay.addEventListener('click', function(e) {
        if (e.target === this) closeLogin();
    });
}

// Fecha login ao enviar formulario
var loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        closeLogin();
    });
}

// Fecha login ao pressionar ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLogin();
});

// ===== CARROSSEL COM DRAG =====
function setupCarousel(carouselId) {
    var carousel = document.getElementById(carouselId);
    if (!carousel) return;

    var isDown = false;
    var startX;
    var scrollLeft;

    carousel.addEventListener('mousedown', function(e) {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', function() {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', function() {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', function(e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - carousel.offsetLeft;
        var walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('touchstart', function(e) {
        isDown = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    }, { passive: true });

    carousel.addEventListener('touchend', function() {
        isDown = false;
    });

    carousel.addEventListener('touchmove', function(e) {
        if (!isDown) return;
        var x = e.touches[0].pageX - carousel.offsetLeft;
        var walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    }, { passive: true });

    carousel.style.cursor = 'grab';
    carousel.style.userSelect = 'none';
}

// ===== BANCO DE DADOS DE JOGOS =====
var gameDatabase = {
    'Grand Theft Auto V': {
        appid: '271590',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_hero.jpg',
        genre: 'acao',
        price: '299.90',
        description: 'Retorne a Vice City em uma nova era de crime e caos. Explore um mundo aberto massivo com tres protagonistas jogaveis, missoes epicas e um multiplayer revolucionario.',
        rating: '4.9'
    },
    'Elden Ring': {
        appid: '1245620',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg',
        genre: 'rpg',
        price: '249.90',
        description: 'Criado por Hidetaka Miyazaki e George R.R. Martin, mergulhe nas Terras Intermediarias. Um RPG de acao em mundo aberto com combate desafiador e lore profundo.',
        rating: '4.8'
    },
    'The Witcher 3': {
        appid: '292030',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_hero.jpg',
        genre: 'rpg',
        price: '79.90',
        description: 'A jornada final de Geralt de Rivia. Cace a Crianca da Profecia em um mundo aberto vasto, repleto de monstros, politica e escolhas morais impactantes.',
        rating: '4.9'
    },
    'Red Dead Redemption 2': {
        appid: '1174180',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_hero.jpg',
        genre: 'acao',
        price: '199.90',
        description: 'Viva a historia de Arthur Morgan e a gangue Van der Linde na America de 1899. Um western epico com mundo aberto incrivelmente detalhado.',
        rating: '4.8'
    },
    'Cyberpunk 2077': {
        appid: '1091500',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_hero.jpg',
        genre: 'rpg',
        price: '199.90',
        description: 'Night City espera por voce. Um RPG de acao futurista em primeira pessoa com personalizacao profunda, hacking e combate visceral.',
        rating: '4.5'
    },
    'God of War Ragnarok': {
        appid: '2322010',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/library_hero.jpg',
        price: '299.90',
        description: 'Kratos e Atreus enfrentam o fim dos tempos. Uma jornada epica pelos Nove Reinos com combate brutal e narrativa emocionante.',
        rating: '4.9'
    },
    'Hogwarts Legacy': {
        appid: '990080',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_hero.jpg',
        genre: 'rpg',
        price: '249.90',
        description: 'Viva a magia do seculo XIX em Hogwarts. Explore o castelo, aprenda feiticos, descubra segredos e forje seu proprio destino magico.',
        rating: '4.6'
    },
    'Black Myth: Wukong': {
        appid: '2358720',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_hero.jpg',
        genre: 'acao',
        price: '229.90',
        description: 'Baseado na Jornada ao Oeste, controle o Rei Macaco em um soulslike de acao com visuais deslumbrantes e combate desafiador.',
        rating: '4.7'
    },
    'Starfield': {
        appid: '1716740',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/library_hero.jpg',
        genre: 'rpg',
        price: '299.90',
        description: 'O primeiro novo universo da Bethesda em 25 anos. Explore mais de 1000 planetas, construa naves e descubra os misterios do cosmos.',
        rating: '4.3'
    },
    "Baldur's Gate 3": {
        appid: '1086940',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/library_hero.jpg',
        genre: 'rpg',
        price: '249.90',
        description: 'Um RPG tatico baseado em D&D 5e. Crie seu personagem, recrute companheiros e molde a historia com suas escolhas em um mundo de fantasia rico.',
        rating: '4.9'
    },
    'Expedition 33': {
        appid: '1903340',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1903340/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1903340/library_hero.jpg',
        genre: 'terror',
        price: '229.90',
        description: 'Um thriller psicologico de terror de sobrevivencia. Dois protagonistas, duas historias entrelaçadas e uma narrativa perturbadora.',
        rating: '4.7'
    },
    "Marvel's Spider-Man 2": {
        appid: '2651280',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2651280/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2651280/library_hero.jpg',
        genre: 'acao',
        price: '349.90',
        description: 'Peter Parker e Miles Morales unem forcas contra novas ameacas. Balancie-se por Nova York com mecanicas aprimoradas e viloes iconicos.',
        rating: '4.8'
    },
    'Dark Souls III': {
        appid: '374320',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/library_hero.jpg',
        genre: 'rpg',
        price: '99.90',
        description: 'A conclusao da saga. Enfrente lordes caidos em um mundo agonizante com combate preciso, bosses memoraveis e lore enigmatico.',
        rating: '4.7'
    },
    'Sekiro: Shadows Die Twice': {
        appid: '814380',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_hero.jpg',
        genre: 'acao',
        price: '129.90',
        description: 'Um shinobi sem braco busca vinganca no Japao feudal. Combate vertical, prosteticos letais e dificuldade implacavel.',
        rating: '4.8'
    },
    'Resident Evil 4': {
        appid: '2050650',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/library_hero.jpg',
        genre: 'terror',
        price: '149.90',
        description: 'Leon S. Kennedy resgata a filha do presidente em uma vila espanhola amaldicoada. Terror, acao e quebra-cabecas em um remake magistral.',
        rating: '4.9'
    },
    'Hades': {
        appid: '1145360',
        cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/library_600x900_2x.jpg',
        hero: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/library_hero.jpg',
        genre: 'indie',
        price: '39.90',
        description: 'Fuja do submundo como Zagreus, filho de Hades. Um roguelike de acao com narrativa evolutiva, combate fluido e deuses do Olimpo para ajudar.',
        rating: '4.9'
    }
};

// ===== DETALHE DO JOGO =====
var previousSection = 'home';

function showGameDetail(title, genre, price) {
    // Guarda os dados do jogo atual para usar no resize
    currentDetailTitle = title;
    currentDetailGenre = genre;
    currentDetailPrice = price;

    // Guarda a secao anterior para o botao voltar
    var activeSection = document.querySelector('.section.active');
    if (activeSection) {
        previousSection = activeSection.id;
    }

    // Esconde todas as secoes e mostra detalhe
    document.querySelectorAll('.section').forEach(function(sec) {
        sec.classList.remove('active');
    });

    var gameDetail = document.getElementById('gameDetail');
    if (gameDetail) {
        gameDetail.classList.add('active');
    }

    // Busca dados do jogo
    var game = gameDatabase[title];

    // Atualiza titulo
    var detailTitle = document.getElementById('detailTitle');
    if (detailTitle) detailTitle.textContent = title;

    // Atualiza genero
    var detailGenre = document.getElementById('detailGenre');
    if (detailGenre) {
        detailGenre.textContent = genre.toUpperCase();

        var genreColors = {
            'ACAO': '#3b82f6',
            'RPG': '#8b5cf6',
            'TERROR': '#ef4444',
            'INDIE': '#22c55e'
        };
        var color = genreColors[genre.toUpperCase()] || '#3b82f6';
        detailGenre.style.color = color;
        detailGenre.style.borderColor = color;
    }

    // Atualiza preco
    var detailPrice = document.getElementById('detailPrice');
    if (detailPrice) {
        detailPrice.textContent = 'R$ ' + (game ? game.price : price);
    }

    // Atualiza descricao
    var descEl = document.querySelector('.detail-description');
    if (descEl) {
        descEl.textContent = game ? game.description : 'Uma experiencia epica que redefine os padroes do genero.';
    }

    // Atualiza rating
    var rating = game ? game.rating : '4.5';
    var stars = Math.round(parseFloat(rating));
    var starsHtml = '';
    for (var i = 0; i < 5; i++) {
        starsHtml += i < stars ? '★' : '☆';
    }
    var starsEl = document.querySelector('.stars');
    var scoreEl = document.querySelector('.score');
    if (starsEl) starsEl.innerHTML = starsHtml;
    if (scoreEl) scoreEl.textContent = rating;

    // ===== IMAGEM: PC vertical (em pe), Mobile horizontal (deitada) =====
    var img = document.getElementById('detailImage');
    if (img) {
        var isMobile = window.innerWidth <= 1024;

        // Limpa imagem anterior
        img.src = '';
        img.removeAttribute('src');
        img.style.opacity = '0';

        var imageUrl = '';

        if (game && game.appid) {
            if (isMobile) {
                // Mobile: imagem HORIZONTAL (deitada) - library_hero
                imageUrl = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/library_hero.jpg';
            } else {
                // PC: imagem VERTICAL (em pe) - library_600x900_2x
                imageUrl = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/library_600x900_2x.jpg';
            }
        } else if (game) {
            // Jogos sem appid (exclusivos console)
            imageUrl = game.cover;
        }

        img.src = imageUrl;
        img.alt = title;

        // Fallback em cadeia
        img.onerror = function() {
            if (game && game.appid) {
                if (isMobile) {
                    // Se hero falhou no mobile, tenta cover vertical
                    this.src = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/library_600x900_2x.jpg';
                } else {
                    // Se cover falhou no PC, tenta hero
                    this.src = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/library_hero.jpg';
                }
                this.onerror = function() {
                    // Tenta header como ultimo recurso
                    this.src = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/header.jpg';
                    this.onerror = function() {
                        // Placeholder final
                        this.src = 'https://via.placeholder.com/600x800/1a1a2e/fff?text=' + encodeURIComponent(title);
                    };
                };
            } else {
                this.src = 'https://via.placeholder.com/600x800/1a1a2e/fff?text=' + encodeURIComponent(title);
            }
        };

        img.onload = function() {
            this.style.opacity = '1';
        };
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== RECARREGAR IMAGEM DA PÁGINA DE DETALHE =====
function reloadDetailImage() {
    if (!currentDetailTitle) return;

    var game = gameDatabase[currentDetailTitle];
    var img = document.getElementById('detailImage');
    if (!img) return;

    var isMobile = window.innerWidth <= 1024;
    var imageUrl = '';

    if (game && game.appid) {
        if (isMobile) {
            // Mobile: imagem HORIZONTAL (deitada)
            imageUrl = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/library_hero.jpg';
        } else {
            // PC: imagem VERTICAL (em pé)
            imageUrl = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/library_600x900_2x.jpg';
        }
    } else if (game) {
        imageUrl = game.cover;
    }

    // Só troca se a URL for diferente da atual
    if (img.src !== imageUrl) {
        img.style.opacity = '0';

        setTimeout(function() {
            img.src = imageUrl;
            img.alt = currentDetailTitle;

            img.onerror = function() {
                if (game && game.appid) {
                    if (isMobile) {
                        this.src = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/library_600x900_2x.jpg';
                    } else {
                        this.src = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/library_hero.jpg';
                    }
                    this.onerror = function() {
                        this.src = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/header.jpg';
                        this.onerror = function() {
                            this.src = 'https://via.placeholder.com/600x800/1a1a2e/fff?text=' + encodeURIComponent(currentDetailTitle);
                        };
                    };
                } else {
                    this.src = 'https://via.placeholder.com/600x800/1a1a2e/fff?text=' + encodeURIComponent(currentDetailTitle);
                }
            };

            img.onload = function() {
                this.style.opacity = '1';
            };
        }, 200);
    }
}

function goBack() {
    // Limpa dados do detalhe
    currentDetailTitle = '';
    currentDetailGenre = '';
    currentDetailPrice = '';

    document.querySelectorAll('.section').forEach(function(sec) {
        sec.classList.remove('active');
    });

    var prevSection = document.getElementById(previousSection);
    if (prevSection) {
        prevSection.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== FILTRO DE JOGOS =====
function filterGames(genre) {
    // Atualiza botao ativo
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Filtra cards
    var cards = document.querySelectorAll('#allGamesGrid .game-card');
    cards.forEach(function(card) {
        if (genre === 'all' || card.dataset.genre === genre) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            card.offsetHeight;
            card.style.animation = 'fadeInUp 0.4s ease';
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===== ATUALIZAR IMAGENS DOS CARDS =====
function updateCardImages() {
    document.querySelectorAll('.game-card').forEach(function(card) {
        var titleEl = card.querySelector('h3');
        if (!titleEl) return;

        var title = titleEl.textContent.trim();
        var img = card.querySelector('img');
        if (!img) return;

        var game = gameDatabase[title];
        if (game && game.appid) {
            // Cards sempre usam capa vertical
            img.src = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/library_600x900_2x.jpg';
            img.alt = title;

            img.onerror = function() {
                this.src = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/header.jpg';
                this.onerror = function() {
                    this.src = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/capsule_616x353.jpg';
                };
            };
        }
    });
}

// ===== VARIÁVEL GLOBAL: JOGO ATUAL NA PÁGINA DE DETALHE =====
var currentDetailTitle = '';
var currentDetailGenre = '';
var currentDetailPrice = '';

// ===== INICIALIZACAO =====
document.addEventListener('DOMContentLoaded', function() {
    setupCarousel('popularCarousel');
    setupCarousel('newCarousel');
    updateCardImages();

    var navbar = document.querySelector('.navbar');
    var lastScroll = 0;

    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 16, 20, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(15, 16, 20, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ===== LISTENER DE RESIZE: TROCA IMAGEM QUANDO MUDA TELA =====
    var resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Se estivermos na página de detalhe, recarrega a imagem
            var gameDetail = document.getElementById('gameDetail');
            if (gameDetail && gameDetail.classList.contains('active') && currentDetailTitle) {
                reloadDetailImage();
            }
        }, 250); // Espera 250ms após parar de redimensionar
    });

    document.querySelectorAll('.game-card').forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
});

// ===== REDIMENSIONAMENTO DE TELA =====
// Detecta quando o usuario redimensiona e recarrega a imagem do detalhe
var lastWindowWidth = window.innerWidth;
var resizeTimeout;

window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        var currentWidth = window.innerWidth;
        var wasMobile = lastWindowWidth <= 1024;
        var isMobile = currentWidth <= 1024;

        // So recarrega se cruzou o limite de mobile/PC
        if (wasMobile !== isMobile) {
            var gameDetail = document.getElementById('gameDetail');
            if (gameDetail && gameDetail.classList.contains('active')) {
                // Recarrega a imagem com o novo formato
                var img = document.getElementById('detailImage');
                var title = document.getElementById('detailTitle');
                if (img && title) {
                    var game = gameDatabase[title.textContent];
                    if (game && game.appid) {
                        var newSrc;
                        if (isMobile) {
                            newSrc = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/library_hero.jpg';
                        } else {
                            newSrc = 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + game.appid + '/library_600x900_2x.jpg';
                        }

                        // Só troca se for diferente
                        if (img.src !== newSrc) {
                            img.style.opacity = '0';
                            setTimeout(function() {
                                img.src = newSrc;
                                img.onload = function() {
                                    this.style.opacity = '1';
                                };
                            }, 200);
                        }
                    }
                }
            }
        }

        lastWindowWidth = currentWidth;
    }, 250);
});