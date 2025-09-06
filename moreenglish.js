       function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const size = Math.random() * 10 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
                particle.style.animationDelay = `${Math.random() * 2}s`;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        function hideLoadingScreen() {
            const loadingScreen = document.querySelector('.loading-screen');
            const container = document.querySelector('.container');
            
            loadingScreen.style.transform = 'translateY(-100%)';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 1000);
        }
        
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            const themeIcon = document.querySelector('.theme-toggle i');
            if (isDarkMode) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
        
        function toggleShareModal() {
            document.getElementById('shareModal').classList.toggle('active');
        }
        
        function showCopiedMessage() {
            const message = document.getElementById('copied-message');
            const copyText = document.getElementById('copy-text');
            
            copyText.textContent = "COPIED!";
            message.classList.add('show');
            
            setTimeout(() => {
                message.classList.remove('show');
                setTimeout(() => {
                    copyText.textContent = "COPY LINK";
                }, 300);
            }, 2000);
        }
        
        function shareOnPlatform(platform) {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent("Check out More English - English teaching platform");
            
            let shareUrl;
            
            switch(platform) {
                case 'copy':
                    navigator.clipboard.writeText(window.location.href)
                        .then(() => {
                            showCopiedMessage();
                        });
                    return;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'messenger':
                    shareUrl = `fb-messenger://share?link=${url}`;
                    break;
                case 'snapchat':
                    shareUrl = `https://www.snapchat.com/scan?attachmentUrl=${url}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${text}&body=${text} ${url}`;
                    break;
                default:
                    return;
            }
            
            window.open(shareUrl, '_blank');
            toggleShareModal();
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
                const themeIcon = document.querySelector('.theme-toggle i');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            
            setTimeout(hideLoadingScreen, 3000);
            
            document.getElementById('themeToggle').addEventListener('click', toggleTheme);
            document.getElementById('shareBtn').addEventListener('click', toggleShareModal);
            document.getElementById('closeModal').addEventListener('click', toggleShareModal);
            
            document.querySelectorAll('.share-option').forEach(option => {
                option.addEventListener('click', function() {
                    shareOnPlatform(this.dataset.platform);
                });
            });
            
            document.getElementById('shareModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    toggleShareModal();
                }
            });
        });